// app/api/answers/route.ts
import { streamText } from "ai";
import { groq } from "@ai-sdk/groq";

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
    
    console.log("Step 6: Creating streamText...");
    const result = await streamText({
      model: groq("llama-3.3-70b-versatile"),
      system: "You are Clubverse — the most financially correct private club platform ever built.",
      messages,
      onError: ({ error }) => {
        console.error("=== STREAM ERROR FROM GROQ ===");
        console.error("Error type:", typeof error);
        console.error("Error message:", error?.message);
        console.error("Error:", JSON.stringify(error, null, 2));
      },
    });
    
    console.log("Step 7: streamText created successfully");
    console.log("Step 8: Converting to data stream response...");
    const response = result.toDataStreamResponse();
    console.log("Step 9: Response created, returning...");
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
