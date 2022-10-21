from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import func
try:
    from .question_model import *
    from .connector import createSession
except:
    from question_model import *
    from connector import createSession

def getQuestion(db:Session, question_id:int) -> Question:
    return db.query(Question).filter(Question.id == question_id).scalar()

def FilterByDifficulty(db:Session, difficulty: Difficulty = Difficulty.medium, company:str = "None", tags:list = [], user_id:str= ""):
    """

    :param db:
    :param difficulty:
    :param company:
    :param tags:
    :param user_id: Future use for user history
    :return:
    """
    queryStmt = select(QuestionIndex.id)\
        .filter(QuestionIndex.difficulty == difficulty)
    if company != "None":
        queryStmt = queryStmt.join(CompanyQuestions, QuestionIndex.id == CompanyQuestions.questionid)\
            .filter(CompanyQuestions.company == company)
    if len(tags):
        queryStmt = queryStmt.join(Tag, Tag.id == QuestionIndex.id)\
            .filter(Tag.tag.in_(tags))
    return db.execute(queryStmt.order_by(func.rand()))

def getLastQuestionIdScraped(db:Session):
    return db.query(func.max(Question.id)).scalar()

def addHistory(db:Session, user_id:str, question_id:int):
    qnId = select(QuestionIndex.id).filter(QuestionIndex.id==question_id)
    p = db.execute(qnId).scalar()
    print("HI", p)
    h = UserHistory(id = user_id, question_id=qnId)
    db.add(h)
    try:
        db.commit()
    except:
        print("OIIII YOU DUN ADD AGAIN HOR")
        db.rollback()

def getHistory(db:Session, user_id: str):
    return db.query(UserHistory).filter(UserHistory.id == user_id).all()

def getQuestionIndex(db:Session):
    return db.query(QuestionIndex).all()

if __name__ == "__main__":
    sessionMake = createSession()
    session = sessionMake()

    print(FilterByDifficulty(db=session).scalar())
    addHistory(session, "foo", 1)
    print(getHistory(session, "foo"))
    # print(getQuestionIndex(session))