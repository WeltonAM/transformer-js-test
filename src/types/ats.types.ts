export interface ATSAnalyzePayload {
  resumeText: File;
  jobDescription: string;
}

export type ATSWorkerMessage =
  | { status: "complete"; score: number }
  | { status: "initiate"; file: string }
  | { status: "progress"; file: string; progress: number }
  | { status: "done"; file: string };
