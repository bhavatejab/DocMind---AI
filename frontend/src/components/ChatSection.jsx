import { useEffect, useRef, useState } from "react";

import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";

import { askQuestion } from "../services/api";

const welcomeMessage = {
  sender: "ai",
  text:
    "👋 Welcome to DocMind AI!\n\nUpload a PDF and start an intelligent conversation with your document.\n\nYou can ask questions, generate summaries, explain concepts, and discover key insights instantly.",
};

function ChatSection({ newChatTrigger, uploadComplete }) {
  const [messages, setMessages] = useState([welcomeMessage]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    setMessages([welcomeMessage]);
    setLoading(false);
  }, [newChatTrigger]);

  const handleSend = async (question) => {
    if (!uploadComplete) return;

    const userMessage = {
      sender: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      console.log("Sending question:", question);

      const response = await askQuestion(question);

      console.log("Backend response:", response);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: response.answer,
          sources: response.sources || [],
        },
      ]);
    } catch (error) {
      console.error("Chat Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Failed to get AI response.",
          sources: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">
            DocMind AI
          </h2>

          <p className="mt-1 text-slate-400">
            {uploadComplete
              ? "Your document is ready. Ask anything!"
              : "Upload a PDF to begin your conversation."}
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-700 bg-slate-900 shadow-xl">
        <div className="h-[550px] overflow-y-auto p-8">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              sender={message.sender}
              text={message.text}
              sources={message.sources}
            />
          ))}

          {loading && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-slate-700 p-6">
          <ChatInput
            onSend={handleSend}
            loading={loading}
            disabled={!uploadComplete}
          />
        </div>
      </div>
    </section>
  );
}

export default ChatSection;