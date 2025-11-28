"use client";

import { useChat } from "ai/react";
import { useState } from "react";

const SUGGESTED_QUESTIONS = [
  "How does billing actually work — can it ever be wrong?",
  "What happens in a divorce or family split?",
  "How do you handle guests and prevent abuse?",
  "How do we migrate from Jonas without breaking anything?",
  "What if a coach forgets to mark attendance?",
];

export default function AnswersPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: "/api/answers",
    });
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const hasMessages = messages.length > 0;

  const handleQuestionClick = (question: string) => {
    setSelectedQuestion(question);
    handleInputChange({
      target: { value: question },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-16 md:space-y-20">
        {/* Hero + Input */}
        <section className="space-y-8 text-center">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
              Instant Answers
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold text-white">
              Ask Clubverse anything
            </h1>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
              Billing, reconciliation, migration edge cases — our knowledge base
              is built for precision. Drop a question like you would in ChatGPT
              or Grok and get a premium answer back.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex items-center gap-3 rounded-full bg-gray-950/80 border border-gray-900 px-5 py-3 shadow-2xl shadow-black/40 focus-within:border-gray-700 transition">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Ask a question..."
                disabled={isLoading}
                className="flex-1 bg-transparent text-lg placeholder-gray-500 text-white focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="h-12 w-12 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/30 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-1">
                    <span className="w-2 h-2 bg-white/70 rounded-full animate-bounce" />
                    <span
                      className="w-2 h-2 bg-white/70 rounded-full animate-bounce"
                      style={{ animationDelay: "0.15s" }}
                    />
                    <span
                      className="w-2 h-2 bg-white/70 rounded-full animate-bounce"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </form>
        </section>

        {/* Messages */}
        <section className="space-y-4 rounded-3xl border border-gray-900 bg-gray-950/40 p-6 md:p-8 min-h-[300px]">
          {!hasMessages && (
            <div className="text-center text-gray-500">
              Your conversation will appear here once you ask something.
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-5 py-4 ${
                  message.role === "user"
                    ? "bg-white text-black"
                    : "bg-gray-900/60 border border-gray-800 text-gray-100"
                }`}
              >
                <div className="whitespace-pre-wrap break-words">
                  {message.content}
                </div>
              </div>
            </div>
          ))}

          {error && (
            <div className="rounded-2xl px-5 py-4 bg-red-950/20 border border-red-900/50 text-red-400">
              <div className="font-medium mb-1">Oops — something went wrong</div>
              <div className="text-sm">
                {error.message || "Failed to get response. This might be a rate limit or network issue."}
              </div>
              <div className="text-xs text-red-500/70 mt-2">
                Try again in 30 seconds, or ask a shorter question.
              </div>
            </div>
          )}
        </section>

        {/* Suggested Questions */}
        <section className="space-y-4 text-center">
          <div className="text-sm uppercase tracking-[0.25em] text-gray-500">
            Suggested Questions
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {SUGGESTED_QUESTIONS.map((question, idx) => (
              <button
                key={idx}
                onClick={() => handleQuestionClick(question)}
                className={`px-5 py-3 text-sm md:text-base rounded-full border transition-all duration-200 ${
                  selectedQuestion === question
                    ? "text-white border-gray-600 bg-gray-900/70"
                    : "text-gray-300 border-gray-900 bg-gray-950/60 hover:text-white hover:border-gray-700"
                }`}
              >
                {question}
              </button>
            ))}
          </div>
        </section>

        {/* Video Card */}
        <section>
          <div className="rounded-3xl border border-gray-900 bg-gray-950/60 px-6 py-10 md:px-10 text-center">
            <div className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-3">
              Video Coming Soon
            </div>
            <p className="text-gray-300 text-lg md:text-xl">
              Why clubs switch to Clubverse in 2025
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

