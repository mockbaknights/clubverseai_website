// app/api/answers/route.ts
import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";
import { RAGService } from "./rag-service";

export const runtime = "nodejs";
export const maxDuration = 30;

export const POST = async (req: Request) => {
  console.log("=== ANSWERS API ROUTE CALLED ===");
  console.log("Timestamp:", new Date().toISOString());
  console.log("GROQ_API_KEY exists:", !!process.env.GROQ_API_KEY);
  
  try {
    console.log("Step 1: Parsing request body...");
    const body = await req.json();
    console.log("Step 2: Body parsed, keys:", Object.keys(body));
    
    const { messages } = body;
    console.log("Step 3: Messages extracted, type:", typeof messages, "isArray:", Array.isArray(messages));
    
    if (!messages || !Array.isArray(messages)) {
      console.error("ERROR: Messages validation failed");
      throw new Error("Messages must be an array");
    }
    
    console.log("Step 4: Messages valid, count:", messages.length);
    console.log("Step 5: First message:", messages[0] ? { role: messages[0].role, contentLength: messages[0].content?.length } : "none");
    
    // Get user query from last message
    const lastMessage = messages[messages.length - 1];
    const userQuery = lastMessage?.role === "user" ? lastMessage.content : "";
    
    // Get RAG context (with timeout and fallback)
    let ragContext = "";
    try {
      console.log("Step 6: Getting RAG context...");
      const contextPromise = RAGService.getContext(userQuery, 5);
      const timeoutPromise = new Promise<string>((resolve) => {
        setTimeout(() => resolve(""), 5000); // 5 second timeout
      });
      ragContext = await Promise.race([contextPromise, timeoutPromise]);
      console.log("Step 7: RAG context retrieved, length:", ragContext.length);
    } catch (ragError) {
      console.error("RAG error (non-fatal, continuing with basic prompt):", ragError);
      ragContext = "";
    }
    
    // Build system prompt with RAG context
    let systemPrompt = "You are Clubverse — the most financially correct private club platform ever built. Answer questions about Clubverse helpfully and accurately. If you don't have specific code context, provide general guidance based on typical club management software workflows.";
    
    if (ragContext && ragContext.length > 0 && !ragContext.includes("No relevant code found")) {
      systemPrompt += `\n\nHere is relevant code from the Clubverse codebase:\n\n${ragContext}\n\nIMPORTANT: Only use code context that directly answers the user's question. If the context is about a different topic (e.g., divorce when asked about creating), ignore it and answer based on general Clubverse knowledge. When asked about how to do something, reference the actual code paths and UI elements mentioned in the code.`;
    }
    
    console.log("Step 8: Creating streamText...");
    const result = await streamText({
      model: groq("llama-3.3-70b-versatile"),
      system: systemPrompt,
      messages,
      onError: ({ error }) => {
        console.error("=== STREAM ERROR FROM GROQ ===");
        console.error("Error type:", typeof error);
        if (error && typeof error === 'object' && 'message' in error) {
          console.error("Error message:", (error as any).message);
        }
        console.error("Error:", JSON.stringify(error, null, 2));
      },
    });
    
    console.log("Step 9: streamText created successfully");
    console.log("Step 10: Converting to data stream response...");
    const response = result.toDataStreamResponse();
    console.log("Step 11: Response created, returning...");
    console.log("Response headers:", Object.fromEntries(response.headers.entries()));
    
    return response;
  } catch (error: any) {
    console.error("=== API ROUTE ERROR ===");
    console.error("Error type:", typeof error);
    console.error("Error name:", error?.name);
    console.error("Error message:", error?.message);
    console.error("Error stack:", error?.stack);
    console.error("Full error:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));

    // Even errors must be streamed — NEVER return JSON
    console.log("Creating error stream...");
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        const msg = error?.message || "Try again in 30 seconds";
        // Escape JSON special characters
        const escapedMsg = msg.replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '');
        console.log("Enqueueing error message:", escapedMsg);
        controller.enqueue(
          encoder.encode(
            `data: {"error":"${escapedMsg}"}\n\n`
          )
        );
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
        console.log("Error stream closed");
      },
    });

    return new Response(stream, {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  }
};
