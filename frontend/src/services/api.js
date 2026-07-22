const API_URL = "https://docmind-ai-production-ca68.up.railway.app";

export async function uploadPDF(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  console.log("Status:", response.status);

  const text = await response.text();

  console.log("Raw Response:", text);

  if (!response.ok) {
    throw new Error(text);
  }

  return JSON.parse(text);
}

export async function askQuestion(question) {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  const text = await response.text();

  console.log("Chat Response:", text);

  if (!response.ok) {
    throw new Error(text);
  }

  return JSON.parse(text);
}