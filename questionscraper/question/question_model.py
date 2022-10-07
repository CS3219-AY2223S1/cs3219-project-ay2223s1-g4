import enum
from sqlalchemy import Column, ForeignKey, Integer, String, Enum
from sqlalchemy.dialects.mysql import MEDIUMTEXT
from sqlalchemy.orm import relationship

from question.connector import Base

class Difficulty(enum.Enum):
    easy = 1
    medium = 2
    hard = 3

class QuestionIndex(Base):
    __tablename__ = "questionindex"
    id = Column(Integer, primary_key = True, index=True)
    href = Column(String, unique=True)
    difficulty = Column(Enum(Difficulty), index=True)
    title = Column(String)
    companies = relationship('CompanyQuestions', back_populates="questionindex")
    solution = relationship("Solution")
    question = relationship("Question")

class CompanyQuestions(Base):
    __tablename__ = "company"
    companies = Column(String, primary_key = True, index = True)
    questionid = Column(Integer, ForeignKey("questionindex.id"), primary_key = True, index=True)

class Question(Base):
    __tablename__ = "question"
    id = Column(Integer, ForeignKey("questionindex.id"), primary_key = True)
    problem = Column(MEDIUMTEXT, nullable=False)

class Solution(Base):
    __tablename__= "solution"
    id = Column(Integer, ForeignKey("questionindex.id"), primary_key = True, index=True)
    problem = Column(MEDIUMTEXT, nullable=False)
    leetcode = Column(String)

class UserHistory(Base):
    __tablename__ = 'userhistory'
    id = Column(String, primary_key = True, index = True)
    question_id = Column(Integer, ForeignKey("questionindex.id"))

class Tag(Base):
    __tablename__ = 'topictag'
    id = Column(Integer, ForeignKey("questionindex.id"), primary_key = True, index=True)


