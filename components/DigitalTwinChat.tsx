"use client";

import { ArrowUp, Bot, Download, MessageCircle, RotateCcw, Sparkles, UserRound } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  contactFahad?: boolean;
};

const resumeUrl = "/Muhammad_Fahad_Khan_Resume.pdf";

const whatsappUrl =
  "https://wa.me/923432610494?text=Hi%20Fahad%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect.";

const starters = [
  "What is Fahad's strongest experience?",
  "Is Fahad open to remote roles?",
  "Walk me through his career journey.",
];

const featuredAnswers: Record<string, string> = {
  "what is fahad's strongest experience?":
    "Fahad's strongest experience is building frontends for large US e-commerce brands — Williams-Sonoma, Backcountry and MotoSport — as part of the Nisum team. He builds reusable, accessible (WCAG) components in a micro-frontend monorepo shared across React, Next.js and Vue, improved Core Web Vitals (LCP, CLS) on web and mobile, and migrated a legacy AngularJS tool to React and a PHP storefront to a Next.js monorepo. He also maintains the Backcountry React Native app and uses AI-assisted development (Cursor, Copilot, Claude, ChatGPT) daily, including on the QBric AI QA Tool and the CodeCure AI medical coding business site.",
  "is fahad open to remote roles?":
    "Yes. Fahad is open to fully remote roles worldwide, as well as on-site or hybrid roles in Pakistan. He is comfortable working across US and EU time zones and already works closely with US-based teams day to day.",
  "walk me through his career journey.":
    "Fahad started as a React Developer at Third Venture Interactive in 2018, building web and mobile apps with React.js and React Native. He moved into mobile at Batoota / NytroTech (2019–2020), then joined Cooperative Computing, where he migrated Dastgyr from Expo to bare React Native. Since August 2021 he has been a Principal Software Engineer at Nisum, building frontends and contributing to performance and modernization work for US e-commerce and healthcare products — 8+ years in total.",
};

const welcome: ChatMessage = {
  role: "assistant",
  content:
    "Hi — I'm Fahad's AI assistant. Ask me about his experience, the brands he's built for, his skills, or his availability.",
};

export default function DigitalTwinChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([welcome]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const windowRef = useRef<HTMLDivElement>(null);
  const featuredAnswerTimer = useRef<number | null>(null);

  useEffect(() => {
    // Scroll only inside the chat box — scrollIntoView would also scroll the page.
    const chatWindow = windowRef.current;
    if (chatWindow) chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: "smooth" });
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
        throw new Error(data.error || "The AI assistant is unavailable right now.");
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
          : "The AI assistant is unavailable right now.",
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
            <strong>Fahad&apos;s AI Assistant</strong>
            <span><i /> Online · Resume-grounded</span>
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

      <div className="chat-window" ref={windowRef} aria-live="polite" aria-busy={loading}>
        {messages.map((message, index) => (
          <div className={`chat-row ${message.role}`} key={`${message.role}-${index}`}>
            <span className="message-avatar" aria-hidden="true">
              {message.role === "assistant" ? <Sparkles size={15} /> : <UserRound size={15} />}
            </span>
            <div className="message-bubble">
              <span>{message.role === "assistant" ? "AI Assistant" : "You"}</span>
              <p>{message.content}</p>
              {message.contactFahad && (
                <div className="chat-actions">
                  <a className="chat-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
                    <MessageCircle size={16} /> Connect on WhatsApp
                  </a>
                  <a className="chat-resume" href={resumeUrl} download="Muhammad_Fahad_Khan_Resume.pdf">
                    <Download size={16} /> Download resume
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat-row assistant">
            <span className="message-avatar"><Sparkles size={15} /></span>
            <div className="message-bubble typing"><span>AI Assistant</span><p><i /><i /><i /></p></div>
          </div>
        )}
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
          placeholder="Ask about experience, skills, or availability…"
          rows={1}
          maxLength={500}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()} aria-label="Send message">
          <ArrowUp size={19} />
        </button>
      </form>
      <p className="ai-disclaimer">AI representation · Answers are grounded in the published resume and may be imperfect.</p>
    </div>
  );
}
