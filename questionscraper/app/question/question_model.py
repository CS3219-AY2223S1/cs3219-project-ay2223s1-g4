import enum
from sqlalchemy import Column, ForeignKey, Integer, String, Enum
from sqlalchemy.dialects.mysql import MEDIUMTEXT
from sqlalchemy.orm import relationship

from app.question.connector import Base

class Difficulty(enum.Enum):
    easy = 1
    medium = 2
    hard = 3

class QuestionIndex(Base):
    __tablename__ = "questionindex"
    id = Column(Integer, primary_key = True, index=True)
    title = Column(String(255))
    href = Column(String(255), unique=True)
    difficulty = Column(Enum(Difficulty), index=True, default=Difficulty.medium)

    def __repr__(self):
        return f"< id={self.id} problem_title= {self.title} href= {self.href} difficulty:{self.difficulty} />"

class CompanyQuestions(Base):
    __tablename__ = "companytags"
    company = Column(String(255), primary_key = True, index = True)
    questionid = Column(Integer, ForeignKey("questionindex.id"), primary_key = True, index=True)

    question = relationship("QuestionIndex", backref="companytags")
    def __repr__(self):
        return f"< id={self.questionid} company= {self.company} />"

class Question(Base):
    __tablename__ = "question"
    id = Column(Integer, ForeignKey("questionindex.id"), primary_key=True, index=True)
    title = Column(String(255))
    problem = Column(MEDIUMTEXT, nullable=False)
    explanation = Column(MEDIUMTEXT, nullable=False, default="Not Populated Yet.")

    question_index = relationship("QuestionIndex", backref="question")
    def __repr__(self):
        return f"< id={self.id} title= {self.title} problem= {self.problem} explanation= {self.explanation}/>"

class UserHistory(Base):
    __tablename__ = 'userhistory'
    id = Column(String(255), primary_key = True, index = True)
    question_id = Column(Integer, ForeignKey("questionindex.id"))

    question = relationship("QuestionIndex", backref="userhistory")

    def __repr__(self):
        return f"< user_id={self.id} question_id= {self.question_id} />"


class Tag(Base):
    __tablename__ = 'topictag'
    id = Column(Integer, ForeignKey("questionindex.id"), primary_key = True, index=True)
    tag = Column(String(255), index=True)

    # Relationship
    question = relationship("QuestionIndex", backref="topictag")

    def __repr__(self):
        return f"< id={self.id} tag= {self.tag} />"

if __name__ == "__main__":
    print(QuestionIndex.__table__)
    print(CompanyQuestions.__table__)
    print(Question.__table__)
    print(UserHistory.__table__)
    print(Tag.__table__)
