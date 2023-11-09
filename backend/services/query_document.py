from routers.query_documents_schemas import QuerySchema


def get_query_answer(query: QuerySchema):
    return {"answer": query.question}