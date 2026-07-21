import os
import pickle

from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings

VECTOR_DB = "vectorstore"

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


def create_vector_store(chunks):
    db = FAISS.from_texts(chunks, embedding_model)

    os.makedirs(VECTOR_DB, exist_ok=True)

    db.save_local(VECTOR_DB)


def search_vector_store(query, k=3):
    db = FAISS.load_local(
        VECTOR_DB,
        embedding_model,
        allow_dangerous_deserialization=True
    )

    docs = db.similarity_search(query, k=k)

    return docs