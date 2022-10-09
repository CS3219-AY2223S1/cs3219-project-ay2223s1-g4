from enum import Enum
from pydantic import BaseModel

class Difficulty(str, Enum):
    easy = 'easy'
    medium = 'medium'
    hard = 'hard'

class QuestionBase(BaseModel):
    id: int
    href : str
    difficulty : Difficulty
    title : str

class CompanyQuestion(BaseModel):
    id: int
    problem : str

class Question(QuestionBase):
    companies : list[CompanyQuestion]
    class Config:
        orm_mode = True