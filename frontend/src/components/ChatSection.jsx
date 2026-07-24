const handleSend = async (question) => {
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