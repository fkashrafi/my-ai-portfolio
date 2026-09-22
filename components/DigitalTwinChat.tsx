"use client";

import { ArrowUp, Bot, MessageCircle, RotateCcw, Sparkles, UserRound } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  contactFahad?: boolean;
};

const whatsappUrl =
  "https://wa.me/923432610494?text=Hi%20Fahad%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect.";

const starters = [
  "What is Fahad's strongest experience?",
  "Walk me through his career journey.",
  "Which technologies does he work with?",
];

const featuredAnswers: Record<string, string> = {
  "what is fahad's strongest experience?":
    "Fahad's strongest experience is combining AI engineering with production-grade software architecture. His AI work includes the QBric AI QA Tool, where he built the reporting and dashboard experience for an AI test-automation platform, and CodeCure AI, a micro-SaaS and brand platform developed through AI-assisted workflows. He uses Cursor, GitHub Copilot, Claude, ChatGPT, Lovable, and v0 for prototyping, scaffolding, refactoring, and code review, backed by deep experience leading React and Next.js architecture, accessibility, Core Web Vitals, microservices integration, and React Native products.",
  "walk me through his career journey.":
    "Today, Fahad works as a Principal Software Engineer and AI Engineer, building AI-focused products such as the QBric AI QA Tool and CodeCure AI while embedding AI-assisted development into everyday engineering. His journey began as a React Developer at Third Venture Interactive in 2018, followed by mobile product work at Batoota / NytroTech and React Native modernization at Cooperative Computing. Since August 2021, he has been at Nisum, where his scope has expanded across AI tooling, front-end architecture, legacy modernization, Core Web Vitals, accessible component systems, microservices, and production React Native applications.",
};

const welcome: ChatMessage = {
  role: "assistant",
  content:
    "Hi — I’m Fahad’s AI career twin. Ask me about his AI projects, AI engineering skills, experience, or career journey.",
};

export default function DigitalTwinChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([welcome]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const featuredAnswerTimer = useRef<number | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, loading]);

  useEffect(() => {
    return () => {
      if (featuredAnswerTimer.current) window.clearTimeout(featuredAnswerTimer.current);
    };
  }, []);

  async function sendMessage(text: string) {
    const question = text.trim();
    if (!question || loading) return;

    const nextMessages = [...messages, { role: "user" as const, content: question }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(true);

    const featuredAnswer = featuredAnswers[question.toLowerCase()];
    if (featuredAnswer) {
      featuredAnswerTimer.current = window.setTimeout(() => {
        setMessages((current) => [
          ...current,
          { role: "assistant", content: featuredAnswer },
        ]);
        setLoading(false);
        featuredAnswerTimer.current = null;
      }, 420);
      return;
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-8) }),
      });

      const data = (await response.json()) as {
        message?: string;
        error?: string;
        contactFahad?: boolean;
      };
      if (!response.ok || !data.message) {
        throw new Error(data.error || "The digital twin is unavailable right now.");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.message as string,
          contactFahad: data.contactFahad,
        },
      ]);
    } catch (requestError) {
      console.error(
        requestError instanceof Error
          ? requestError.message
          : "The digital twin is unavailable right now.",
      );
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "I couldn't retrieve a reliable answer right now. Please connect with Fahad directly on WhatsApp.",
          contactFahad: true,
        },
      ]);
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
          onClick={() => {
            if (featuredAnswerTimer.current) window.clearTimeout(featuredAnswerTimer.current);
            featuredAnswerTimer.current = null;
            setMessages([welcome]);
            setError("");
            setInput("");
            setLoading(false);
          }}
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
              {message.contactFahad && (
                <a className="chat-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
                  <MessageCircle size={16} /> Connect with Fahad on WhatsApp
                </a>
              )}
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
