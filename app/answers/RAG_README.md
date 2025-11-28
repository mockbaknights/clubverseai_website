# Answers Page RAG System

The Answers page (`/answers`) now uses RAG (Retrieval Augmented Generation) to answer questions based on your actual codebase from private GitHub repositories.

## How It Works

1. **GitHub Integration**: Fetches all `.ts`, `.tsx`, `.prisma`, and `.md` files from configured private repos
2. **Embedding Generation**: Uses HuggingFace's `all-MiniLM-L6-v2` model to create vector embeddings
3. **Vector Store**: Stores embeddings in memory with cosine similarity search
4. **RAG Retrieval**: When a user asks a question, finds the 5 most relevant code chunks
5. **Context Injection**: Passes relevant code to Groq LLM for accurate, code-based answers

## Architecture

```
User Query
    ↓
RAGService.getContext()
    ↓
VectorStore.search() → Finds top 5 relevant chunks
    ↓
Groq LLM (with code context)
    ↓
Streamed Response
```

## Files

- `github-service.ts` - Fetches files from private GitHub repos
- `embedding-service.ts` - Generates embeddings using HuggingFace
- `vector-store.ts` - Stores and searches embeddings
- `rag-service.ts` - Orchestrates RAG pipeline
- `route.ts` - API endpoint that uses RAG

## Environment Variables

See `ENV_SETUP.md` for full details:

- `GITHUB_TOKEN` - Required for private repo access
- `GITHUB_OWNER` - Your GitHub org/username (default: "your-org")
- `GITHUB_REPOS` - Comma-separated repos (default: "clubverse-core-v5,clubverse-docs")
- `GROQ_API_KEY` - Required for LLM responses

## Caching

- Embeddings are cached in memory
- Cache refreshes every hour or on deploy
- First request may take 1-2 minutes to initialize (fetching + embedding)
- Subsequent requests are fast (< 1 second)

## Performance

- Initial load: ~1-2 minutes (one-time)
- Query processing: < 1 second
- Memory usage: ~100-500MB depending on codebase size

## Example Queries

- "How do I add a new member?" → Answers from actual code
- "What's the billing calculation logic?" → Shows relevant code snippets
- "How does the migration system work?" → References actual implementation

## Troubleshooting

**"GITHUB_TOKEN is required"**
- Set `GITHUB_TOKEN` in `.env.local`
- Token needs `repo` scope for private repos

**Slow first request**
- Normal! First request initializes the vector store
- Subsequent requests are fast

**"No relevant code found"**
- Check that repos are accessible with your token
- Verify `GITHUB_OWNER` and `GITHUB_REPOS` are correct
- Check server logs for GitHub API errors

