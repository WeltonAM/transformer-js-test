import { useContext } from "react";
import { ATSWorkerContext } from "../contexts/ats-analyzer-context";

export function useATSAnalyzer() {
  const ctx = useContext(ATSWorkerContext);
  if (!ctx)
    throw new Error("useATSAnalyzer must be used within ATSWorkerProvider");
  return ctx;
}
