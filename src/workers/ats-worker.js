import { pipeline } from "@huggingface/transformers";

class ATSAnalyzerPipeline {
    static task = "feature-extraction";
    static model = "Xenova/all-MiniLM-L6-v2";
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = await pipeline(this.task, this.model, {
                progress_callback,
            });
        }
        return this.instance;
    }
}

function cosineSimilarity(a, b) {
    let dot = 0; let normA = 0; let normB = 0;
    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

self.addEventListener("message", async (event) => {
    const { resumeText, jobDescription } = event.data;

    const extractor = await ATSAnalyzerPipeline.getInstance((x) => {
        self.postMessage(x);
    });

    const resumeEmbedding = await extractor(resumeText, { pooling: "mean", normalize: true });
    const jobEmbedding = await extractor(jobDescription, { pooling: "mean", normalize: true });

    const score = cosineSimilarity(resumeEmbedding.data, jobEmbedding.data);

    self.postMessage({
        status: "complete",
        score: score,
    });
});