import { VectorStore } from "./vector-store";
import { LangchainGitHubLoader } from "./github-loader";
import { Document } from "@langchain/core/documents";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

// Global cache - loads once on cold start
let vectorStore: VectorStore | null = null;
let isInitializing: boolean = false;
let initializationPromise: Promise<void> | null = null;

export class RAGService {
  private static async getVectorStore(): Promise<VectorStore> {
    // If already initialized, return it
    if (vectorStore) {
      return vectorStore;
    }

    // If currently initializing, wait for it
    if (isInitializing && initializationPromise) {
      await initializationPromise;
      return vectorStore!;
    }

    // Start initialization
    isInitializing = true;
    initializationPromise = this.initializeVectorStore();
    
    try {
      await initializationPromise;
      return vectorStore!;
    } catch (error) {
      isInitializing = false;
      initializationPromise = null;
      throw error;
    }
  }

  private static async initializeVectorStore(): Promise<void> {
    console.log("=== Initializing RAG Service ===");
    vectorStore = new VectorStore();

    try {
      const token = process.env.GITHUB_TOKEN;
      const owner = process.env.GITHUB_OWNER || "your-org";
      const repo = process.env.GITHUB_REPOS?.split(",")[0]?.trim() || "clubverse-core-v5";

      if (!token) {
        console.warn("GITHUB_TOKEN not set, falling back to local knowledge files");
        await this.loadLocalKnowledge(vectorStore);
        return;
      }

      console.log(`Fetching files from GitHub: ${owner}/${repo}...`);
      const githubLoader = new LangchainGitHubLoader(token, owner, repo, "main");
      const documents: Document[] = await githubLoader.load();
      console.log(`Fetched ${documents.length} documents from GitHub.`);

      if (documents.length === 0) {
        console.warn("No documents fetched from GitHub, falling back to local knowledge");
        await this.loadLocalKnowledge(vectorStore);
        return;
      }

      await vectorStore.initialize(documents);
      console.log("RAG service initialized successfully");
    } catch (error) {
      console.error("Error initializing RAG from GitHub:", error);
      console.log("Falling back to local knowledge files...");
      await this.loadLocalKnowledge(vectorStore);
    } finally {
      isInitializing = false;
    }
  }

  private static async loadLocalKnowledge(store: VectorStore): Promise<void> {
    try {
      const knowledgePath = join(process.cwd(), "app", "answers", "knowledge");
      const files = readdirSync(knowledgePath).filter((f) => f.endsWith(".md"));

      const documents: Document[] = [];
      for (const file of files) {
        try {
          const content = readFileSync(join(knowledgePath, file), "utf-8");
          // Skip files that are mostly placeholders or too short
          if (content.includes("[Content to be populated") || content.length < 200) {
            console.log(`Skipping placeholder file: ${file}`);
            continue;
          }
          documents.push(
            new Document({
              pageContent: content,
              metadata: {
                source: `knowledge/${file}`,
                repo: "local-knowledge",
              },
            })
          );
        } catch (error) {
          console.error(`Error reading knowledge file ${file}:`, error);
        }
      }

      if (documents.length > 0) {
        console.log(`Loaded ${documents.length} local knowledge files`);
        await store.initialize(documents);
      } else {
        console.warn("No local knowledge files found");
      }
    } catch (error) {
      console.error("Error loading local knowledge:", error);
    }
  }

  static async getContext(query: string, topK: number = 5): Promise<string> {
    try {
      const store = await this.getVectorStore();
      const chunks = await store.search(query, topK);

      if (chunks.length === 0) {
        return "No relevant code found in the codebase.";
      }

      const contextParts = chunks.map((chunk, index) => {
        return `[${index + 1}] File: ${chunk.metadata.path} (${chunk.metadata.repo})\n${chunk.text}\n---`;
      });

      return contextParts.join("\n\n");
    } catch (error) {
      console.error("Error getting RAG context:", error);
      return "Unable to retrieve code context at this time.";
    }
  }

  static getStats() {
    return vectorStore?.getStats() || { totalChunks: 0, isInitialized: false };
  }

  static clearCache() {
    vectorStore = null;
    isInitializing = false;
    initializationPromise = null;
  }
}

