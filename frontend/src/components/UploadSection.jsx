import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Trash2,
} from "lucide-react";

import { uploadPDF } from "../services/api";

export default function UploadSection({
  fileName,
  onUploadSuccess,
  onRemoveFile,
}) {
  const inputRef = useRef(null);

  const [uploading, setUploading] = useState(false);

  const handleChoose = () => {
    inputRef.current?.click();
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      await uploadPDF(file);

      onUploadSuccess(file.name);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload PDF.");
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  if (fileName) {
    return (
      <motion.section
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-slate-700 bg-slate-900 px-6 py-5 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-cyan-600/20 p-3">
              <FileText className="h-7 w-7 text-cyan-400" />
            </div>

            <div>
              <h3 className="font-semibold text-white">{fileName}</h3>

              <p className="text-sm text-slate-400">
                Ready to answer your questions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-green-400">
              <CheckCircle2 className="h-5 w-5" />
              Ready
            </div>

            <button
              onClick={onRemoveFile}
              className="rounded-xl border border-red-500/30 p-3 text-red-400 transition hover:bg-red-500/10"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-slate-800 bg-slate-900 px-10 py-14"
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        hidden
        onChange={handleFile}
      />

      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-cyan-600/15">
          <UploadCloud className="h-12 w-12 text-cyan-400" />
        </div>

        <h2 className="mt-8 text-4xl font-bold text-white">
          Upload your PDF
        </h2>

        <p className="mt-4 text-lg text-slate-400">
          Ask questions, generate summaries, create notes,
          and chat with your documents using AI.
        </p>

        <button
          type="button"
          onClick={handleChoose}
          disabled={uploading}
          className="mt-10 rounded-2xl bg-cyan-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Choose PDF"}
        </button>

        <p className="mt-5 text-sm text-slate-500">
          Supports PDF files up to your backend limit.
        </p>
      </div>
    </motion.section>
  );
}