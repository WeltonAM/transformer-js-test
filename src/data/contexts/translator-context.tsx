import { createContext, useEffect, useReducer, useRef } from "react";
import type {
    TranslatePayload,
    TranslatorWorkerMessage,
} from "../../types/translator.types";

/* =======================
   TYPES
======================= */

export interface TranslatorProgressItem {
    file: string;
    progress: number;
}

interface TranslatorState {
    ready: boolean | null;
    loading: boolean;
    output: string;
    progressItems: TranslatorProgressItem[];
}

const initialState: TranslatorState = {
    ready: null,
    loading: false,
    output: "",
    progressItems: [],
};

/* =======================
   ACTIONS
======================= */

export const TranslatorActionTypes = {
    READY: "READY",
    START: "START",
    UPDATE: "UPDATE",
    COMPLETE: "COMPLETE",
    PROGRESS_START: "PROGRESS_START",
    PROGRESS_UPDATE: "PROGRESS_UPDATE",
    PROGRESS_DONE: "PROGRESS_DONE",
} as const;

type TranslatorAction =
    | { type: typeof TranslatorActionTypes.READY }
    | { type: typeof TranslatorActionTypes.START }
    | { type: typeof TranslatorActionTypes.UPDATE; payload: string }
    | { type: typeof TranslatorActionTypes.COMPLETE; payload: string }
    | {
        type: typeof TranslatorActionTypes.PROGRESS_START;
        payload: TranslatorProgressItem;
    }
    | {
        type: typeof TranslatorActionTypes.PROGRESS_UPDATE;
        payload: TranslatorProgressItem;
    }
    | {
        type: typeof TranslatorActionTypes.PROGRESS_DONE;
        payload: { file: string };
    };

/* =======================
   REDUCER
======================= */

function translatorReducer(
    state: TranslatorState,
    action: TranslatorAction
): TranslatorState {
    switch (action.type) {
        case TranslatorActionTypes.READY:
            return { ...state, ready: true };

        case TranslatorActionTypes.START:
            return {
                ...state,
                loading: true,
                output: "",
                progressItems: [],
            };

        case TranslatorActionTypes.UPDATE:
            return { ...state, output: action.payload };

        case TranslatorActionTypes.COMPLETE:
            return {
                ...state,
                output: action.payload,
                loading: false,
                progressItems: [],
            };

        case TranslatorActionTypes.PROGRESS_START:
            return {
                ...state,
                progressItems: [...state.progressItems, action.payload],
            };

        case TranslatorActionTypes.PROGRESS_UPDATE:
            return {
                ...state,
                progressItems: state.progressItems.map(item =>
                    item.file === action.payload.file ? action.payload : item
                ),
            };

        case TranslatorActionTypes.PROGRESS_DONE:
            return {
                ...state,
                progressItems: state.progressItems.filter(
                    item => item.file !== action.payload.file
                ),
            };

        default:
            return state;
    }
}

/* =======================
   CONTEXT
======================= */

export interface TranslatorWorkerContextValue {
    state: TranslatorState;
    translate: (payload: TranslatePayload) => void;
}

const TranslatorWorkerContext =
    createContext<TranslatorWorkerContextValue | undefined>(undefined);

/* =======================
   PROVIDER
======================= */

export function TranslatorWorkerProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [state, dispatch] = useReducer(translatorReducer, initialState);
    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        const worker = new Worker(
            new URL("../../workers/translator-worker.js", import.meta.url),
            { type: "module" }
        );

        workerRef.current = worker;

        const onMessage = (e: MessageEvent<TranslatorWorkerMessage>) => {
            switch (e.data.status) {
                case "initiate":
                    dispatch({
                        type: TranslatorActionTypes.PROGRESS_START,
                        payload: {
                            file: e.data.file,
                            progress: e.data.progress,
                        },
                    });
                    break;

                case "progress":
                    dispatch({
                        type: TranslatorActionTypes.PROGRESS_UPDATE,
                        payload: {
                            file: e.data.file,
                            progress: e.data.progress,
                        },
                    });
                    break;

                case "done":
                    dispatch({
                        type: TranslatorActionTypes.PROGRESS_DONE,
                        payload: { file: e.data.file },
                    });
                    break;

                case "ready":
                    dispatch({ type: TranslatorActionTypes.READY });
                    break;

                case "update":
                    dispatch({
                        type: TranslatorActionTypes.UPDATE,
                        payload: e.data.output,
                    });
                    break;

                case "complete":
                    dispatch({
                        type: TranslatorActionTypes.COMPLETE,
                        payload: e.data.output[0].generated_text,
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

    const translate = (payload: TranslatePayload) => {
        if (!workerRef.current) return;
        dispatch({ type: TranslatorActionTypes.START });
        workerRef.current.postMessage(payload);
    };

    return (
        <TranslatorWorkerContext.Provider value={{ state, translate }}>
            {children}
        </TranslatorWorkerContext.Provider>
    );
}

export default TranslatorWorkerContext;
