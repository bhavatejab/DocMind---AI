from fastapi import APIRouter
from pydantic import BaseModel

from app.services.vector_store import search_vector_store
from app.services.gemini_service import (
    classify_query,
    general_chat,
    ask_gemini,
)

router = APIRouter()


class Question(BaseModel):
    question: str


@router.post("/chat")
async def chat(data: Question):
    question = data.question.strip()

    # Step 1: Classify the user's message
    intent = classify_query(question)

    print("=" * 60)
    print("Intent:", intent)
    print("=" * 60)

    # Step 2: Handle general conversation
    if intent == "GENERAL":
        answer = general_chat(question)

        return {
            "question": question,
            "answer": answer,
            "sources": []
        }

    # Step 3: Document Search (RAG)
    docs = search_vector_store(question)

    print("=" * 60)
    print("Retrieved Docs:", len(docs))

    context = "\n\n".join([doc.page_content for doc in docs])

    print("Context Sent To Gemini:")
    print(context[:1000])
    print("=" * 60)

    answer = ask_gemini(question, context)

    sources = []

    for index, doc in enumerate(docs, start=1):
        sources.append(
            {
                "chunk": index,
                "content": doc.page_content
            }
        )

    return {
        "question": question,
        "answer": answer,
        "sources": sources
    }