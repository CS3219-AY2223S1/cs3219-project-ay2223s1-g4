from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from pydantic import BaseModel
import uvicorn

app = FastAPI()

@app.get("/get_id/{user_id}")
async def generate_question_id(user_id:str, difficulty='easy', tag:str | None = None, company: str | None = None):
    return {"id": 1}

@app.get("/get_question/{question_id}")
async def getQuestion(question_id: int):
    return {'question_id': question_id, 'problem': "2Sum"}

@app.get("/get_solution/{question_id}")
async def getQuestion(question_id: int):
    return {'question_id': question_id, 'solution': "2Sum"}

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
