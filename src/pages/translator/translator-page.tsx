import { useEffect, useState } from "react";
import Page from "../../components/template/page";
import { useTranslator } from "../../data/hooks/use-translator";
import LanguageSelector from "../../components/translator/LanguageSelector";
import Progress from "../../components/shared/Progress";

export default function TranslatorPage() {
    const { state, translate } = useTranslator();

    const [input, setInput] = useState("I love walking my dog.");
    const [sourceLanguage, setSourceLanguage] = useState("eng_Latn");
    const [targetLanguage, setTargetLanguage] = useState("por_Latn");

    const handleTranslate = () => {
        translate({
            text: input,
            src_lang: sourceLanguage,
            tgt_lang: targetLanguage,
        });
    };

    useEffect(() => {
        document.title = "Transformer JS - Translator";
    }, []);

    return (
        <Page title="Transformer.js Translator">
            <div className="flex flex-col items-center">
                <div className="w-full bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex gap-4 mb-6">
                        <LanguageSelector
                            type="Source"
                            defaultLanguage="eng_Latn"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSourceLanguage(e.target.value)}
                        />
                        <LanguageSelector
                            type="Target"
                            defaultLanguage="por_Latn"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTargetLanguage(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                                Source Text
                            </label>
                            <textarea
                                value={input}
                                rows={6}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
                                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none font-medium text-gray-800"
                                placeholder="Enter text to translate..."
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                                Translation
                            </label>
                            <textarea
                                value={state.output}
                                rows={6}
                                readOnly
                                className="w-full p-4 border-2 border-gray-200 rounded-lg bg-gray-50 resize-none font-medium text-gray-800"
                                placeholder="Translation will appear here..."
                            />
                        </div>
                    </div>
                </div>

                <button
                    disabled={state.loading}
                    onClick={handleTranslate}
                    className="
                        mt-6 px-8 py-3 bg-linear-to-r 
                        from-blue-600 to-indigo-600 
                        text-white font-semibold rounded-lg shadow-lg 
                        hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 
                        disabled:opacity-50 disabled:cursor-not-allowed 
                        transition-all transform 
                        hover:scale-105 active:scale-95 cursor-pointer
                    "
                >
                    Translate
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
                                Loading models...
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
            </div>
        </Page >
    );
}
