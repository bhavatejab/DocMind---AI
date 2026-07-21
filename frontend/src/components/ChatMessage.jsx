import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Bot,
  User,
  Copy,
  Check,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ChatMessage({ sender, text, sources = [] }) {
  const isUser = sender === "user";

  const [copied, setCopied] = useState(false);
  const [showSources, setShowSources] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex mb-8 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex max-w-5xl w-full gap-4 ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        {/* Avatar */}

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            isUser
              ? "bg-cyan-600"
              : "border border-slate-700 bg-slate-900"
          }`}
        >
          {isUser ? (
            <User size={18} />
          ) : (
            <Bot size={18} className="text-cyan-400" />
          )}
        </div>

        {/* Bubble */}

        <div
          className={`rounded-3xl border shadow-lg ${
            isUser
              ? "max-w-2xl border-cyan-500/30 bg-cyan-600 text-white"
              : "flex-1 border-slate-700 bg-slate-800"
          }`}
        >
          {isUser ? (
            <div className="p-6">
              <p className="whitespace-pre-wrap leading-8">{text}</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-slate-700 px-6 py-4">
                <div>
                  <h3 className="font-semibold text-cyan-400">
                    DocMind AI
                  </h3>

                  <p className="text-xs text-slate-500">
                    AI Assistant
                  </p>
                </div>

                <button
                  onClick={handleCopy}
                  className="rounded-xl border border-slate-700 p-2 transition hover:border-cyan-500 hover:bg-slate-700"
                >
                  {copied ? (
                    <Check size={18} />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              </div>

              <div className="prose prose-invert max-w-none p-6 prose-pre:bg-slate-950 prose-pre:rounded-xl prose-code:text-cyan-300">
                <ReactMarkdown>{text}</ReactMarkdown>
              </div>

              {sources.length > 0 && (
                <div className="border-t border-slate-700 p-6">
                  <button
                    onClick={() => setShowSources(!showSources)}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 transition hover:border-cyan-500"
                  >
                    <div className="flex items-center gap-2">
                      <FileText
                        size={17}
                        className="text-cyan-400"
                      />

                      <span>
                        Sources ({sources.length})
                      </span>
                    </div>

                    {showSources ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>

                  <AnimatePresence>
                    {showSources && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 space-y-3">
                          {sources.map((source, index) => (
                            <div
                              key={index}
                              className="rounded-xl border border-slate-700 bg-slate-900 p-4"
                            >
                              <div className="mb-2 flex items-center gap-2 text-cyan-400 font-semibold">
                                <FileText size={16} />
                                Chunk {source.chunk}
                              </div>

                              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                                {source.content.length > 500
                                  ? source.content.slice(0, 500) + "..."
                                  : source.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ChatMessage;