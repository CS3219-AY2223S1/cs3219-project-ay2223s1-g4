import re
import requests
from bs4 import BeautifulSoup
import markdownify
from question.question_model import *
from question.connector import createSession
from question.question_crud import getLastQuestionIdScraped

# class Scraper():
#     def __init__(self, connector: sqlalchemy.engine.Engine):
#         self.connector = connector

base_url = 'https://leetcode.ca'
sessionMake = createSession()
session = sessionMake()


def getPage(url:str) -> BeautifulSoup:
    page = requests.get(url)
    return BeautifulSoup(page.content, "html.parser")

#
#     url = f'{base_url}/problems.html'
#     soup = getPage(url)
#     tableRows = soup.findAll('tr')
#     for problem in tableRows:
#         problem.find


def scrapeIndex(index:int = 1, populate:bool = True) -> list:
    url = f'{base_url}/all/problems.html'
    soup = getPage(url)
    tableRows = soup.findAll('tr')
    ids = []
    for row in tableRows[index:]:
        row_elements = row.find_all('td')
        id = row_elements[0].text
        problemTitle = row_elements[1].text
        subUrl = row_elements[1].a['href']
        difficulty = row_elements[2].text.lower()
        if difficulty:
            questions = QuestionIndex(id=id, title=problemTitle, href=subUrl, difficulty=Difficulty[difficulty])
        else:
            questions = QuestionIndex(id=id, title=problemTitle, href=subUrl)
        print(questions)
        if populate:
            session.add(questions)
        ids.append((int(id), problemTitle, subUrl, questions))
    return ids
# scrapeIndex(1)
def populateProblems(ids:list):
    numNoSolutions = []
    for qid, title, i, qnModel in ids:
        url = f'{base_url}/all/{i}'
        soup = getPage(url)
        # soup2 = getPage(soup.find_all("a")[-2]['href'])
        # print(soup.find('title').text)
        # print(soup.find('p').text)
        # print(soup.find('div', class_=["markdown-body"]))
        parsable = str(soup.find('div', class_=["markdown-body"]))
        textboxes = re.split("([\r\n]*Difficulty:[\r\n]*)|([\r\n]*Company:[\r\n]*)|([\r\n]*Problem Solution[\r\n]*)", parsable)
        print("Next Task:", i)
        # print(textboxes)
        solutionLink = soup.find_all('a')[-2]['href']
        problemDescription = markdownify.markdownify(textboxes[0])
        # print("Problem Description: ", markdownify.markdownify(textboxes[0]))
        # print("Companies: ", textboxes[8].strip())
        companyQuestions = list(map(lambda x: CompanyQuestions(questionid=qnModel.id,company=x.text.lower()), soup.find_all("span", class_=["label"])[2:]))
        # solutions.append((qid, solutionLink))
        try:
            solSoup = getPage(solutionLink)
            solSoup.find('h1', {'id': "all-problems"}).decompose()
            solSoup.find('h1', {'id': "all-solutions"}).decompose()
            solution = markdownify.markdownify(str(solSoup.find('article')))
            question = Question(title=title, problem=problemDescription, explanation=solution, id=qnModel.id)
        except:
            numNoSolutions.append([qid, solutionLink])
            print("Unparsed")
            question = Question(title=title, problem=problemDescription, id=qnModel.id)

        # print(question)

        session.add(question)
        for j in companyQuestions:
            session.add(j)
        if (int(qid) % 50) == 1:
            session.commit()
    print("Unable to parse and get these solutions", numNoSolutions)

def getPythonSolutions(id:int):
    pythonSolutions = "https://github.com/cnkyrpsgl/leetcode/blob/master/solutions/python3"
    url = f'{pythonSolutions}/{id}.py'
    soup = getPage(url)
    code = soup.find("table").getText().splitlines()
    print("\n".join(list( filter( lambda x: len(x) > 0, code))))


def populateTags() -> None:
    url = 'https://leetcode.ca/tags/'
    soup = getPage(url)
    tagsToId = soup.find_all('h2')

    # print(tagsToId.find_next_sibling())
    # print(re.search('\d+', tagsToId.find_all('a')[0].getText()).group())
    for t in tagsToId:
        tag = t['id'].replace('.', '').lower()
        anchors = t.find_next_sibling()

        for i in anchors.find_all('a'):
            id = re.search('\d+', i.getText()).group()
            t = Tag(tag=tag, id=int(id))
            # print(t)
            session.add(t)

ids = scrapeIndex(getLastQuestionIdScraped(session)+1, populate=False)
session.commit()
populateProblems(ids)
session.commit()
populateTags()
session.commit()

# for header in soup.find_all('h2'):
#     print(header['id'].replace('.', '').lower())
