import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = model = genai.GenerativeModel("gemini-3.5-flash")


def ask_gemini(question, context):
    prompt = f"""
You are an AI assistant.

Answer ONLY using the information provided below.

If the answer is not present in the context, reply:

"I couldn't find the answer in the uploaded document."

Context:
{context}

Question:
{question}

Answer:
"""

    response = model.generate_content(prompt)

    return response.text