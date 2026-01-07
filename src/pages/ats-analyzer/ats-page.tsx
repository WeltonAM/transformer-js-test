import { useState, useContext } from "react";
import Page from "../../components/template/page";
import ATSWorkerContext from "../../data/contexts/ats-analyzer-context";
import PDFUploader from "../../components/ats-analyzer/pdf-uploader";
import JobDescriptionArea from "../../components/ats-analyzer/job-description-area";
import Progress from "../../components/shared/Progress";
import ATSResult from "../../components/ats-analyzer/ats-result";

export default function ATSPage() {
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [jobText, setJobText] = useState("");
    const { state, analyze } = useContext(ATSWorkerContext)!;

    const handleAnalyze = () => {
        if (!resumeFile) return;
        analyze({ resumeText: resumeFile, jobDescription: jobText });
    };
    return (
        <Page title="ATS Resume Analyzer">
            <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl px-4 py-8 md:px-8 space-y-6">
                <p className="text-gray-600 text-center">
                    Compare seu currículo com a descrição da vaga e veja se ele passa pelos filtros automáticos (ATS).
                </p>

                <div className="flex flex-col w-full max-w-4xl gap-6">
                    <PDFUploader label="Currículo (PDF)" onFileSelect={setResumeFile} />

                    <JobDescriptionArea
                        label="Descrição da vaga"
                        value={jobText}
                        onChange={setJobText}
                        placeholder="Cole aqui a descrição da vaga"
                        rows={8}
                    />
                </div>

                <button
                    disabled={!resumeFile || !jobText || state.loading}
                    onClick={handleAnalyze}
                    className={`
                        w-64 px-8 py-3 
                        bg-linear-to-r from-indigo-600 to-purple-600 
                        text-white font-semibold rounded-lg shadow 
                        disabled:opacity-50 text-center
                        ${!resumeFile || !jobText || state.loading ? "cursor-not-allowed" : "cursor-pointer"}
                    `}
                >
                    {state.loading ? "Analisando..." : "Analisar compatibilidade"}
                </button>

                <div className="w-full max-w-4xl mt-8">
                    {state.loading && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                            <label className="text-blue-800 font-medium flex items-center gap-2">
                                <svg
                                    className="animate-spin h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Carregando modelo...
                            </label>
                        </div>
                    )}

                    <div className="space-y-3">
                        {state.progressItems.map((data) => (
                            <div key={data.file} className="bg-white rounded-lg shadow p-4">
                                <Progress text={data.file} percentage={data.progress} />
                            </div>
                        ))}
                    </div>
                </div>


                <div className="border-t pt-6 text-gray-500 text-sm w-full max-w-4xl">
                    {state.score !== null
                        ? (
                            <div className="w-full max-w-4xl">
                                {state.score !== null ? (
                                    <ATSResult score={state.score} />
                                ) : (
                                    !state.loading && (
                                        <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
                                            O resultado da análise ATS aparecerá aqui após o processamento.
                                        </div>
                                    )
                                )}
                            </div>
                        )
                        : "O resultado da análise ATS aparecerá aqui."}
                </div>
            </div>
        </Page>
    );
}
