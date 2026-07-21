import { useState } from "react";
import { Sparkles, MessageSquarePlus } from "lucide-react";

import UploadSection from "./components/UploadSection";
import ChatSection from "./components/ChatSection";

function App() {
  const [newChatTrigger, setNewChatTrigger] = useState(0);

  const [uploadComplete, setUploadComplete] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleNewChat = () => {
    setNewChatTrigger((prev) => prev + 1);
  };

  const handleUploadSuccess = (uploadedFileName) => {
    setUploadComplete(true);
    setFileName(uploadedFileName);
  };

  const handleRemoveFile = () => {
    setUploadComplete(false);
    setFileName("");
    setNewChatTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4">
      <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-800 px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 p-3 shadow-lg">
              <Sparkles size={28} className="text-white" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">
                DocMind AI
              </h1>

              <p className="text-slate-400">
                Understand every document. Instantly.
              </p>
            </div>
          </div>

          <button
            onClick={handleNewChat}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-slate-200 transition hover:bg-slate-700 hover:border-blue-500"
          >
            <MessageSquarePlus size={20} />
            New Chat
          </button>
        </header>

        <main className="p-8">
          <UploadSection
            fileName={fileName}
            onUploadSuccess={handleUploadSuccess}
            onRemoveFile={handleRemoveFile}
          />

          <ChatSection
            newChatTrigger={newChatTrigger}
            uploadComplete={uploadComplete}
          />
        </main>
      </div>
    </div>
  );
}

export default App;