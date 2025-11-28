import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { EmbeddingService } from "./embedding-service";

interface ChunkMetadata {
  path: string;
  repo: string;
  url?: string;
  startIndex: number;
  endIndex: number;
}

interface Chunk {
  id: string;
  text: string;
  embedding: number[];
  metadata: ChunkMetadata;
}

export class VectorStore {
  private chunks: Chunk[] = [];
  private embeddingService: EmbeddingService;
  private isInitialized: boolean = false;

  constructor() {
    this.embeddingService = new EmbeddingService();
  }

  async initialize(documents: Document[]) {
    if (this.isInitialized) {
      console.log("Vector store already initialized");
      return;
    }

    console.log(`Initializing vector store with ${documents.length} documents...`);
    this.chunks = [];

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    let chunkIdCounter = 0;
    for (const doc of documents) {
      try {
        const docChunks = await splitter.splitText(doc.pageContent);
        const texts = docChunks.map((text) => text.trim()).filter((text) => text.length > 0);

        if (texts.length === 0) continue;

        // Generate embeddings for all chunks in this document
        const embeddings = await this.embeddingService.embedDocuments(texts);

        for (let i = 0; i < texts.length; i++) {
          const text = texts[i];
          const embedding = embeddings[i];
          const startIndex = doc.pageContent.indexOf(text);
          const endIndex = startIndex + text.length;

          this.chunks.push({
            id: `chunk-${chunkIdCounter++}`,
            text,
            embedding,
            metadata: {
              path: doc.metadata.source || "unknown",
              repo: doc.metadata.repo || "unknown",
              url: doc.metadata.url,
              startIndex,
              endIndex,
            },
          });
        }
      } catch (error) {
        console.error(`Error processing document ${doc.metadata.source}:`, error);
      }
    }

    this.isInitialized = true;
    console.log(`Vector store initialized with ${this.chunks.length} chunks.`);
  }

  async search(query: string, topK: number = 5): Promise<Chunk[]> {
    if (!this.isInitialized) {
      throw new Error("Vector store not initialized. Call initialize() first.");
    }

    if (this.chunks.length === 0) {
      return [];
    }

    const queryEmbedding = await this.embeddingService.embedQuery(query);

    const similarities = this.chunks.map((chunk) => ({
      chunk,
      similarity: this.cosineSimilarity(queryEmbedding, chunk.embedding),
    }));

    similarities.sort((a, b) => b.similarity - a.similarity);

    return similarities.slice(0, topK).map((s) => s.chunk);
  }

  private cosineSimilarity(vec1: number[], vec2: number[]): number {
    if (vec1.length !== vec2.length) {
      return 0;
    }

    const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
    const magnitude1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
    const magnitude2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));

    if (magnitude1 === 0 || magnitude2 === 0) {
      return 0;
    }

    return dotProduct / (magnitude1 * magnitude2);
  }

  getStats() {
    return {
      totalChunks: this.chunks.length,
      isInitialized: this.isInitialized,
    };
  }
}

