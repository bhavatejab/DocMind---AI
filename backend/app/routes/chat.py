from fastapi import APIRouter
from pydantic import BaseModel

from app.services.vector_store import search_vector_store
from app.services.gemini_service import ask_gemini

router = APIRouter()


class Question(BaseModel):
    question: str


@router.post("/chat")
async def chat(data: Question):
    docs = search_vector_store(data.question)

    print("=" * 60)
    print("Retrieved Docs:", len(docs))

    context = "\n\n".join([doc.page_content for doc in docs])

    print("Context Sent To Gemini:")
    print(context[:1000])
    print("=" * 60)

    answer = ask_gemini(data.question, context)

    sources = []

    for index, doc in enumerate(docs, start=1):
        sources.append(
            {
                "chunk": index,
                "content": doc.page_content
            }
        )

    return {
        "question": data.question,
        "answer": answer,
        "sources": sources
    }