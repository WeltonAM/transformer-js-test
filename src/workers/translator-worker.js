import { pipeline, TextStreamer } from "@huggingface/transformers";

class MyTranslationPipeline {
  // static task = "translation";
  // static model = "Xenova/nllb-200-distilled-600M";
  static task = "text2text-generation";
  static model = "Xenova/LaMini-Flan-T5-783M";
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }

    return this.instance;
  }
}

// Listen for messages from the main thread
self.addEventListener("message", async (event) => {
  // Retrieve the translation pipeline. When called for the first time,
  // this will load the pipeline and save it for future use.
  let textGenerator = await MyTranslationPipeline.getInstance((x) => {
    // We also add a progress callback to the pipeline so that we can
    // track model loading.
    console.log(`progress callback called with value: ${x}`);
    self.postMessage(x);
  });

  let result = "";

  const streamer = new TextStreamer(textGenerator.tokenizer, {
    // Optional: Skips the prompt text in the output stream
    skip_prompt: true,
    // The function to call with the generated text chunks
    callback_function: (chunk) => {
      result += chunk;
      self.postMessage({
        status: "update",
        output: result,
      });
    },
  });

  // Actually perform the translation
  let output = await textGenerator(event.data.text, {
    max_new_tokens: 200,
    temperature: 0.9,
    repetition_penalty: 2.0,
    no_repeat_ngram_size: 3,
    streamer,
  });

  // Send the output back to the main thread
  self.postMessage({
    status: "complete",
    output: output,
  });
});
