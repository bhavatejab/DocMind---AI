import { Bot } from "lucide-react";
import { motion } from "framer-motion";

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-4 mb-6"
    >
      {/* AI Avatar */}
      <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-lg">
        <Bot size={20} className="text-cyan-400" />
      </div>

      {/* Typing Bubble */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 shadow-lg">

        <p className="text-xs uppercase tracking-wider text-cyan-400 font-semibold mb-3">
          AI Assistant
        </p>

        <div className="flex items-center gap-2">

          <motion.div
            className="w-2 h-2 rounded-full bg-cyan-400"
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: 0,
            }}
          />

          <motion.div
            className="w-2 h-2 rounded-full bg-cyan-400"
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: 0.2,
            }}
          />

          <motion.div
            className="w-2 h-2 rounded-full bg-cyan-400"
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: 0.4,
            }}
          />

          <span className="ml-3 text-slate-400">
            Thinking...
          </span>

        </div>

      </div>
    </motion.div>
  );
}

export default TypingIndicator;