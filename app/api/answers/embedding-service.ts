import { pipeline } from "@xenova/transformers";

export class EmbeddingService {
  private model: any = null;
  private modelName = "Xenova/all-MiniLM-L6-v2";

  async initialize() {
    if (!this.model) {
      console.log("Initializing Xenova embedding model...");
      this.model = await pipeline("feature-extraction", this.modelName);
      console.log("Xenova embedding model initialized");
    }
    return this.model;
  }

  async embedDocuments(texts: string[]): Promise<number[][]> {
    const model = await this.initialize();
    const embeddings: number[][] = [];

    for (const text of texts) {
      const output = await model(text, {
        pooling: "mean",
        normalize: true,
      });
      embeddings.push(Array.from(output.data));
    }

    return embeddings;
  }

  async embedQuery(text: string): Promise<number[]> {
    const model = await this.initialize();
    const output = await model(text, {
      pooling: "mean",
      normalize: true,
    });
    return Array.from(output.data);
  }
}

