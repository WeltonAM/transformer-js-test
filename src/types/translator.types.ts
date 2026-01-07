export interface TranslatePayload {
  text: string;
  src_lang: string;
  tgt_lang: string;
  generation?: {
    max_new_tokens?: number;
    temperature?: number;
    repetition_penalty?: number;
    no_repeat_ngram_size?: number;
  };
}

export type TranslatorWorkerMessage =
  | {
      status: "initiate";
      file: string;
      progress: number;
    }
  | {
      status: "progress";
      file: string;
      progress: number;
    }
  | {
      status: "done";
      file: string;
    }
  | {
      status: "ready";
    }
  | {
      status: "update";
      output: string;
    }
  | {
      status: "complete";
      output: Array<{
        generated_text: string;
      }>;
    };
