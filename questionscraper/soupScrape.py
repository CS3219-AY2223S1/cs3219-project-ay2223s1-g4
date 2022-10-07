import re

import requests
import sqlalchemy.engine
from bs4 import BeautifulSoup

# class Scraper():
#     def __init__(self, connector: sqlalchemy.engine.Engine):
#         self.connector = connector

base_url = 'https://leetcode.ca'

def getPage(url:str) -> BeautifulSoup:
    page = requests.get(url)
    return BeautifulSoup(page.content, "html.parser")

#
#     url = f'{base_url}/problems.html'
#     soup = getPage(url)
#     tableRows = soup.findAll('tr')
#     for problem in tableRows:
#         problem.find

ids = []
def scrapeIndex(index:int):
    url = f'{base_url}/all/problems.html'
    soup = getPage(url)
    tableRows = soup.findAll('tr')

    for row in tableRows[index:]:
        row_elements = row.find_all('td')
        id = row_elements[0].text
        problemTitle = row_elements[1].text
        subUrl = row_elements[1].a['href']
        difficulty = row_elements[2].text
        print(id, problemTitle, subUrl, difficulty)
        ids.append(subUrl)
# scrapeIndex(1)
def populateProblems(ids:list):
    for i in ids:
        url = f'{base_url}/all/{i}'
        soup = getPage(url)
        # soup2 = getPage(soup.find_all("a")[-2]['href'])
        # print(soup.find('title').text)
        # print(soup.find('p').text)
        # print(soup.find('div', class_=["markdown-body"]))
        parsable = soup.find('div', class_=["markdown-body"]).getText().strip()
        textboxes = re.split("([\r\n]*Difficulty:[\r\n]*)|([\r\n]*Company:[\r\n]*)|([\r\n]*Problem Solution[\r\n]*)", parsable)
        print("Next Task:", i)
        solutionLink = soup.find_all('a')[-2]['href']
        problemDescription = textboxes[0].strip()
        companies = textboxes[8].strip()
        print("Problem Description: ", textboxes[0].strip())
        print("Companies: ", textboxes[8].strip())

def getPythonSolutions(id:int):
    pythonSolutions = "https://github.com/cnkyrpsgl/leetcode/blob/master/solutions/python3"
    url = f'{pythonSolutions}/{id}.py'
    soup = getPage(url)
    code = soup.find("table").getText().splitlines()
    print("\n".join(list( filter( lambda x: len(x) > 0, code))))


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
        print(tag, id)
# for header in soup.find_all('h2'):
#     print(header['id'].replace('.', '').lower())

