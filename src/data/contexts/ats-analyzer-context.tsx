import { createContext, useEffect, useReducer, useRef } from "react";
import type { ATSAnalyzePayload, ATSWorkerMessage } from "../../types/ats.types";
import { extractTextFromPDF } from "../../utils/extract-text-from-pdf";
import { useToast } from "../hooks/use-toasify";

/* =======================
   TYPES
======================= */

export interface ATSProgressItem {
    file: string;
    progress: number;
}

export interface ATSState {
    loading: boolean;
    score: number | null;
    progressItems: ATSProgressItem[];
}

const initialState: ATSState = {
    loading: false,
    score: null,
    progressItems: [],
};

/* =======================
   ACTIONS
======================= */

export const ATSActionTypes = {
    START: "START",
    COMPLETE: "COMPLETE",
    RESET: "RESET",
    PROGRESS_START: "PROGRESS_START",
    PROGRESS_UPDATE: "PROGRESS_UPDATE",
    PROGRESS_DONE: "PROGRESS_DONE",
} as const;

type ATSAction =
    | { type: typeof ATSActionTypes.START }
    | { type: typeof ATSActionTypes.COMPLETE; payload: number }
    | { type: typeof ATSActionTypes.RESET }
    | { type: typeof ATSActionTypes.PROGRESS_START; payload: ATSProgressItem }
    | { type: typeof ATSActionTypes.PROGRESS_UPDATE; payload: ATSProgressItem }
    | { type: typeof ATSActionTypes.PROGRESS_DONE; payload: { file: string } };

/* =======================
   REDUCER
======================= */

function atsReducer(state: ATSState, action: ATSAction): ATSState {
    switch (action.type) {
        case ATSActionTypes.START:
            return {
                ...state,
                loading: true,
                score: null,
                progressItems: [],
            };

        case ATSActionTypes.COMPLETE:
            return {
                ...state,
                loading: false,
                score: action.payload,
                progressItems: [],
            };

        case ATSActionTypes.RESET:
            return { ...initialState };

        case ATSActionTypes.PROGRESS_START:
            return {
                ...state,
                progressItems: [...state.progressItems, action.payload],
            };

        case ATSActionTypes.PROGRESS_UPDATE:
            return {
                ...state,
                progressItems: state.progressItems.map((item) =>
                    item.file === action.payload.file ? action.payload : item
                ),
            };

        case ATSActionTypes.PROGRESS_DONE:
            return {
                ...state,
                progressItems: state.progressItems.filter(
                    (item) => item.file !== action.payload.file
                ),
            };

        default:
            return state;
    }
}

/* =======================
   CONTEXT
======================= */

export interface ATSWorkerContextValue {
    state: ATSState;
    analyze: (payload: ATSAnalyzePayload) => void;
    reset: () => void;
}

const ATSWorkerContext =
    createContext<ATSWorkerContextValue | undefined>(undefined);

/* =======================
   PROVIDER
======================= */

export function ATSWorkerProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(atsReducer, initialState);
    const workerRef = useRef<Worker | null>(null);
    const { error, success } = useToast();

    useEffect(() => {
        const worker = new Worker(
            new URL("../../workers/ats-worker.js", import.meta.url),
            { type: "module" }
        );

        workerRef.current = worker;

        const onMessage = (e: MessageEvent<ATSWorkerMessage>) => {
            switch (e.data.status) {
                case "progress":
                    dispatch({
                        type: ATSActionTypes.PROGRESS_UPDATE,
                        payload: {
                            file: e.data.file,
                            progress: e.data.progress,
                        },
                    });
                    break;

                case "initiate":
                    dispatch({
                        type: ATSActionTypes.PROGRESS_START,
                        payload: {
                            file: e.data.file,
                            progress: 0,
                        },
                    });
                    break;

                case "done":
                    dispatch({
                        type: ATSActionTypes.PROGRESS_DONE,
                        payload: { file: e.data.file },
                    });
                    break;

                case "complete":
                    dispatch({
                        type: ATSActionTypes.COMPLETE,
                        payload: e.data.score,
                    });
                    break;
            }
        };

        worker.addEventListener("message", onMessage);

        return () => {
            worker.removeEventListener("message", onMessage);
            worker.terminate();
            workerRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (!state.loading && state.score !== null) {
            success("Análise concluída com sucesso.");
        }
    }, [success, state.loading, state.score]);

    const analyze = async (payload: ATSAnalyzePayload) => {
        if (!workerRef.current) return;

        dispatch({ type: ATSActionTypes.START });

        try {
            const resumeText = await extractTextFromPDF(payload.resumeText);

            if (!resumeText.trim()) {
                throw new Error("Não foi possível extrair texto do PDF.");
            }

            workerRef.current.postMessage({
                resumeText,
                jobDescription: payload.jobDescription,
            });
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : "Erro ao processar currículo.";

            error(errorMessage);

            dispatch({ type: ATSActionTypes.RESET });
        }
    };

    const reset = () => {
        dispatch({ type: ATSActionTypes.RESET });
    };

    return (
        <ATSWorkerContext.Provider value={{ state, analyze, reset }}>
            {children}
        </ATSWorkerContext.Provider>
    );
}

export default ATSWorkerContext;
