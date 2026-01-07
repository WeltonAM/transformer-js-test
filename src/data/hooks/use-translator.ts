import { useContext } from "react";
import TranslatorWorkerContext from "../contexts/translator-context";

export function useTranslator() {
  const ctx = useContext(TranslatorWorkerContext);
  if (!ctx)
    throw new Error(
      "useTranslator must be used within TranslatorWorkerProvider"
    );
  return ctx;
}
