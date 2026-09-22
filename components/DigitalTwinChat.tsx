"use client";

import { ArrowUp, Bot, RotateCcw, Sparkles, UserRound } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const starters = [
  "What is Fahad's strongest experience?",
  "Walk me through his career journey.",
  "Which technologies does he work with?",
];

const welcome: ChatMessage = {
  role: "assistant",
  content:
    "Hi — I’m Fahad’s AI career twin. Ask me about his experience, skills, career progression, or education.",
};

export default function DigitalTwinChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([welcome]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    const question = text.trim();
    if (!question || loading) return;

    const nextMessages = [...messages, { role: "user" as const, content: question }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-8) }),
      });

      const data = (await response.json()) as { message?: string; error?: string };
      if (!response.ok || !data.message) {
        throw new Error(data.error || "The digital twin is unavailable right now.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.message as string },
      ]);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The digital twin is unavailable right now.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="twin-console spotlight-surface">
      <div className="twin-topbar">
        <div className="twin-identity">
          <span className="twin-avatar"><Bot size={20} /></span>
          <div>
            <strong>Fahad / AI Twin</strong>
            <span><i /> Online · résumé grounded</span>
          </div>
        </div>
        <button
          className="reset-chat"
          type="button"
          onClick={() => { setMessages([welcome]); setError(""); setInput(""); }}
          aria-label="Reset conversation"
        >
          <RotateCcw size={16} /> <span>Reset</span>
        </button>
      </div>

      <div className="chat-window" aria-live="polite" aria-busy={loading}>
        {messages.map((message, index) => (
          <div className={`chat-row ${message.role}`} key={`${message.role}-${index}`}>
            <span className="message-avatar" aria-hidden="true">
              {message.role === "assistant" ? <Sparkles size={15} /> : <UserRound size={15} />}
            </span>
            <div className="message-bubble">
              <span>{message.role === "assistant" ? "Digital twin" : "You"}</span>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat-row assistant">
            <span className="message-avatar"><Sparkles size={15} /></span>
            <div className="message-bubble typing"><span>Digital twin</span><p><i /><i /><i /></p></div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {messages.length === 1 && (
        <div className="prompt-starters" aria-label="Suggested questions">
          {starters.map((starter) => (
            <button type="button" key={starter} onClick={() => void sendMessage(starter)}>
              {starter}<ArrowUp size={14} />
            </button>
          ))}
        </div>
      )}

      {error && <p className="chat-error" role="alert">{error}</p>}

      <form className="chat-form" onSubmit={handleSubmit}>
        <label htmlFor="career-question" className="sr-only">Ask a career question</label>
        <textarea
          id="career-question"
          value={input}
          onChange={(event) => setInput(event.target.value.slice(0, 500))}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
          placeholder="Ask about experience, skills, or career journey…"
          rows={1}
          maxLength={500}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()} aria-label="Send message">
          <ArrowUp size={19} />
        </button>
      </form>
      <p className="ai-disclaimer">AI representation · Answers are grounded in the published résumé and may be imperfect.</p>
    </div>
  );
}
