from typing import List

from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from app.question.question_crud import *
import uvicorn
from app.question.connector import createSession
from fastapi.encoders import jsonable_encoder

app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:3000",
]
session = createSession()()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

@app.get("/api/question")
def info():
    return {
        "GET: api/question/index": {
            "Function" : "Returns an Index of Questions and their corresponding difficulty",
            "Response" : "{'questions': [{'id': 1, 'question title': '2sum', 'difficulty' : 'easy', 'href': '/1.html', 'done' : False}] }"
        },
        "POST: api/question/id/{user_id}": {
            "Function": "Generate an Question ID that the user has not seen before",
            "Optional Parameters":
                {
                    "difficulty":
                        ["easy", "medium", "hard"]
                    ,
                    "tag":
                        "Some applicable topic"
                    ,
                    "company":
                        "Some applicable company"
                },
            "Response": {
                "{'id': 1}"
            }
        },
        "GET: api/question/{question_id}": {
            "Function": "Get an specified Question ID with or without solution",
            "Optional Parameters": {
                "solution" : "True/None"
            },
            "Response": {
                "{'question_id': question_id, 'title':'2Sum', 'question': '2Sum', 'solution': solution}",
                "{'question_id': question_id, 'title':'2Sum', 'question': '2Sum'}"
            }
        }
    }


@app.get("/api/question/index")
async def get_all_questions():
    return {"questions": jsonable_encoder(getQuestionIndex(session)) }

class QuestionRequestBody(BaseModel):
    difficulty: str = Field (default="medium")
    tags: List[str] | None
    company: str | None

# TODO: Do authentication?
@app.post("/api/question/id/{user_id}")
async def generate_question_id(user_id: str, question: QuestionRequestBody):
    difficulty = Difficulty[question.difficulty]
    return {"id": FilterByDifficulty(session, difficulty).scalar()}

@app.get("/api/question/{question_id}")
async def getSolution(question_id: int, solution: bool | None):
    question = getQuestion(session, question_id)

    if solution:
        return {'question_id': question_id, 'title': question.title, 'question': question.problem, 'solution': question.explanation}
    else:
        return {'question_id': question_id, 'title': question.title, 'question': question.problem}


# See PyCharm help at https://www.jetbrains.com/help/pycharm/
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8003)
