import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


def classify_query(question: str):
    prompt = f"""
You are an intent classifier.

Classify the user's message into ONLY ONE category.

GENERAL
- Greetings
- Introductions
- Small talk
- Questions about yourself
- Thanks
- Goodbye
- Questions about your capabilities

DOCUMENT
- Anything asking about the uploaded PDF
- Summaries
- Explanations
- Definitions
- Concepts
- Questions from the document

Reply with ONLY one word:

GENERAL

or

DOCUMENT

User:
{question}
"""

    response = model.generate_content(prompt)
    return response.text.strip().upper()


def general_chat(question: str):
    prompt = f"""
You are DocMind AI.

DocMind AI is a friendly AI study assistant.

You help students understand PDFs, summarize notes,
explain concepts, and prepare for exams.

Answer naturally and conversationally.

Keep replies short (under 120 words).

User:
{question}
"""

    response = model.generate_content(prompt)
    return response.text


def ask_gemini(question: str, context: str):
    prompt = f"""
You are DocMind AI.

Answer ONLY using the document context below.

If the answer is not available in the document, politely reply:

"I couldn't find that information in the uploaded document."

Document Context:
{context}

Question:
{question}

Answer:
"""

    response = model.generate_content(prompt)
    return response.text