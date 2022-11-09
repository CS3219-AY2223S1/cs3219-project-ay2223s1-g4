import os
import sys
import uvicorn
from typing import List, Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from fastapi.encoders import jsonable_encoder
from dotenv import load_dotenv
from app.soupScrape import runScrape
from app.question.connector import createSession
from app.question.question_crud import *


load_dotenv()


session = createSession()() 
application = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8001",
    "http://localhost:8002"
]
application.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QuestionRequestBody(BaseModel):
    user_id: str
    difficulty: str = Field (default="medium")
    tags: Optional[List[str]]
    company: Optional[str]


@application.get("/api/question")
def info():
    return {
        "GET: api/question/index": {
            "Function" : "Returns an Index of Questions and their corresponding difficulty",
            "Response" : "{'questions': [{'id': 1, 'question title': '2sum', 'difficulty' : 'easy', 'href': '/1.html', 'done' : False}] }"
        },
        "POST: api/question/id/": {
            "Function": "Generate an Question ID that the user has not seen before",
            "Required Body Parameter": ["user_id"] ,
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


@application.get("/api/question/index")
async def get_all_questions():
    return {"questions": jsonable_encoder(getQuestionIndex(session))}


@application.post("/api/question/id")
async def generate_question_id(question: QuestionRequestBody):
    print(f"Received {question=}")
    difficulty = Difficulty[question.difficulty]
    id = FilterByDifficulty(session, difficulty).scalar()
    return {"id": id}


@application.get("/api/question/{question_id}")
async def getSolution(question_id: int, solution: Optional[bool]):
    print(f"Received {question_id}")
    print(f"Received {solution}")
    question = getQuestion(session, question_id)
    output = {
        'question_id': question_id,
        'title': question.title,
        'question': question.problem
    }
    if solution:
        output['solution'] = question.explanation
    return output


def main() -> None:
    global application

    if len(sys.argv) > 1 and sys.argv[1] == 'scrape':
        print("Running scraping...")
        if len(sys.argv) == 3 and sys.argv[2] == 'limit':
            runScrape(int(sys.argv[2]))
        else:
            runScrape()
        print("Scraping complete!")

    elif len(sys.argv) > 1 and sys.argv[1] == 'scrapeReset':
        print("Running scraping...")
        import app.question.create_tables
        if len(sys.argv) == 3 and sys.argv[2] == 'limit':
            runScrape(int(sys.argv[2]))
        else:
            runScrape()
        print("Scraping complete!")

    uvicorn.run(
        application,
        host=os.environ["SERVICE_HOST"],
        port=int(os.environ["SERVICE_PORT"])
    )


if __name__ == '__main__':
    main()
