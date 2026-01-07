import { Routes, Route, Navigate } from "react-router-dom";
import TranslatorPage from "../pages/translator/translator-page";
import { TranslatorWorkerProvider } from "../data/contexts/translator-context";
import { ATSWorkerProvider } from "../data/contexts/ats-analyzer-context";
import ATSPage from "../pages/ats-analyzer/ats-page";

export function MainRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/translator" replace />} />

            <Route
                path="/translator"
                element={
                    <TranslatorWorkerProvider>
                        <TranslatorPage />
                    </TranslatorWorkerProvider>
                }
            />

            <Route
                path="/ats"
                element={
                    <ATSWorkerProvider>
                        <ATSPage />
                    </ATSWorkerProvider>
                }
            />
        </Routes>
    );
}
