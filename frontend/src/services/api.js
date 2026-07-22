const API_URL = "https://docmind-ai-production-ca68.up.railway.app";

export async function uploadPDF(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload PDF");
  }

  return await response.json();
}

export async function askQuestion(question) {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get AI response");
  }

  return await response.json();
}