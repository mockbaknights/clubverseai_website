import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { Document } from "@langchain/core/documents";

const ALLOWED_EXTENSIONS = [".ts", ".tsx", ".prisma", ".md"];

export class LangchainGitHubLoader {
  private owner: string;
  private repo: string;
  private branch: string;
  private token: string;

  constructor(token: string, owner: string, repo: string, branch: string = "main") {
    this.token = token;
    this.owner = owner;
    this.repo = repo;
    this.branch = branch;
  }

  async load(): Promise<Document[]> {
    try {
      const loader = new GithubRepoLoader(
        `https://github.com/${this.owner}/${this.repo}/tree/${this.branch}`,
        {
          accessToken: this.token,
          recursive: true,
          unknown: "warn",
          branch: this.branch,
          ignorePaths: [
            "*.json",
            "*.lock",
            "*.yml",
            "*.yaml",
            "*.mdx",
            "*.css",
            "*.scss",
            "*.html",
            "*.js",
            "node_modules/**",
            ".git/**",
            "dist/**",
            "build/**",
            "public/**",
            "styles/**",
            "amplify/**",
            "next.config.ts",
            "eslint.config.mjs",
            "postcss.config.mjs",
            "tailwind.config.ts",
            "tsconfig.json",
            "next-env.d.ts",
            "README.md",
            "ENV_SETUP.md",
          ],
        }
      );

      const docs = await loader.load();
      console.log(`Loaded ${docs.length} documents from GitHub`);

      // Filter by allowed extensions
      const filteredDocs = docs.filter((doc) =>
        ALLOWED_EXTENSIONS.some((ext) => doc.metadata.source?.endsWith(ext))
      );

      console.log(`Filtered to ${filteredDocs.length} documents with allowed extensions`);
      return filteredDocs;
    } catch (error) {
      console.error("Error loading from GitHub:", error);
      throw new Error(
        `Failed to load from GitHub: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}

