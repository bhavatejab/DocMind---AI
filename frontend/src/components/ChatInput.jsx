import { useEffect, useRef, useState } from "react";
import { SendHorizontal, Lock } from "lucide-react";
import { motion } from "framer-motion";

function ChatInput({ onSend, loading, disabled }) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "0px";
    textareaRef.current.style.height =
      Math.min(textareaRef.current.scrollHeight, 160) + "px";
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = message.trim();

    if (!trimmed || loading) return;

    onSend(trimmed);
    setMessage("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "56px";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      <div
        className={`overflow-hidden rounded-3xl border shadow-lg transition-all ${
          disabled
            ? "border-slate-800 bg-slate-900"
            : "border-slate-700 bg-slate-800 hover:border-cyan-500/50 focus-within:border-cyan-500"
        }`}
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading || disabled}
          placeholder={
            disabled
              ? "Upload a PDF to begin..."
              : "Ask anything about your document..."
          }
          className="max-h-40 min-h-[58px] w-full resize-none overflow-y-auto bg-transparent px-6 py-5 text-[15px] leading-6 text-white placeholder:text-slate-500 outline-none disabled:cursor-not-allowed"
        />

        <div className="flex items-center justify-between border-t border-slate-700 bg-slate-900/60 px-5 py-3">
          <span className="text-xs text-slate-500">
            Enter ↵ to send • Shift + Enter for a new line
          </span>

          <button
            type="submit"
            disabled={loading || disabled}
            className="flex h-11 min-w-[120px] items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {disabled ? (
              <Lock size={18} />
            ) : (
              <SendHorizontal size={18} />
            )}

            {loading
              ? "Thinking..."
              : disabled
              ? "Locked"
              : "Send"}
          </button>
        </div>
      </div>
    </motion.form>
  );
}

export default ChatInput;