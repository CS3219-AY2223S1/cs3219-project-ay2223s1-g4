from fastapi.testclient import TestClient

import main
from main import application
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.question.question_model import *
import json
client = TestClient(application)
TEST_DB_URL = 'mysql+pymysql://root:pass@0.0.0.0:3306/question-db'
engine = create_engine(
    TEST_DB_URL, pool_pre_ping=True
)

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)
def setup():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(bind=engine)
    loaded = json.load(open("test/question-db.json", 'r'))
    db = TestingSessionLocal()
    d = {}
    for i in loaded:
        d[i['id']]= QuestionIndex(id=i['id'], title=i['title'], href=i['href'], difficulty=i['difficulty'])
        db.add(QuestionIndex(id=i['id'], title=i['title'], href=i['href'], difficulty=i['difficulty']))
    db.commit()
    loaded = json.load(open("test/question.json",'r'))
    for i in loaded:
        # print(i['id'])
        db.add(Question(title=i['title'], problem=i['problem'], explanation=i['explanation'], id=d[i['id']].id))
    db.commit()
    loaded = json.load(open("test/company-tags.json", 'r'))
    for i in loaded:
        db.add(CompanyQuestions( company=i['company'], questionid=d[i['questionid']].id))
    db.commit()


def teardown():
    Base.metadata.drop_all(engine)

def test_home():
    resp = client.get("/")
    assert resp.status_code == 404
    assert resp.json() == {'detail': "Not Found"}

def test_main():
    resp = client.get("/api/question")
    assert resp.status_code == 200
    assert resp.json() ==  {'GET: api/question/index': {'Function': 'Returns an Index of Questions and their corresponding difficulty', 'Response': "{'questions': [{'id': 1, 'question title': '2sum', 'difficulty' : 'easy', 'href': '/1.html', 'done' : False}] }"}, 'POST: api/question/id/': {'Function': 'Generate an Question ID that the user has not seen before', 'Required Body Parameter': ['user_id'], 'Optional Parameters': {'difficulty': ['easy', 'medium', 'hard'], 'tag': 'Some applicable topic', 'company': 'Some applicable company'}, 'Response': ["{'id': 1}"]}, 'GET: api/question/{question_id}': {'Function': 'Get an specified Question ID with or without solution', 'Optional Parameters': {'solution': 'True/None'}, 'Response': ["{'question_id': question_id, 'title':'2Sum', 'question': '2Sum'}", "{'question_id': question_id, 'title':'2Sum', 'question': '2Sum', 'solution': solution}"]}}

def test_getQuestionindex():
    resp = client.get("/api/question/index")
    assert resp.status_code == 200
    assert len(resp.json()['questions']) >= 100

def test_generate_question_id():
    resp = client.post("/api/question/id",json=
                       main.QuestionRequestBody(
                           user_id="1a"
                       ).dict()
                       )
    # print(resp.json())
    assert resp.status_code == 200
    assert resp.json()['id'] <= 100

def test_getQuestion():
    resp = client.get("/api/question/1?solution=true")
    db = TestingSessionLocal()
    # print(db.query(Question).filter(Question.id == 1).scalar())
    print(resp.json())
    assert resp.status_code == 200
    assert resp.json()== {'question_id': 1, 'title': 'Two Sum', 'question': '\nGiven an array of integers, return **indices** of the two numbers such that they\n add up to a specific target.\n\n\nYou may assume that each input would have ***exactly*** one solution, and\n you may not use the *same* element twice.\n\n\n**Example:**\n\n\n\n```\n\nGiven nums = [2, 7, 11, 15], target = 9,\n\nBecause nums[**0**] + nums[**1**] = 2 + 7 = 9,\nreturn [**0**, **1**].\n\n```\n\n\n### \n\n', 'solution': '\nQuestion\n========\n\n\nFormatted question description: <https://leetcode.ca/all/1.html>\n\n\n\n```\n\nGiven an array of integers, find two numbers such that they add up to a specific target number.\n\nThe function twoSum should return indices of the two numbers such that they add up to the target,\nwhere index1 must be less than index2. Please note that your returned answers (both index1 and\nindex2) are not zero-based.\n\nYou may assume that each input would have exactly one solution.\n\nInput: numbers={2, 7, 11, 15}, target=9 Output: index1=1, index2=2\n\n\n```\n\nAlgorithm\n=========\n\n\nGenerally speaking, in order to increase the complexity of time, you need to use space for exchange. This is considered a trade off.\n\n\nBut here I only want to use linear time complexity to solve the problem, that is, only one number can be traversed, then another number, you can store it in advance and use a HashMap to establish the mapping between the number and its coordinate position.\n\n\nSince the HashMap is a constant-level search efficiency, when traversing the array, use the target to subtract the traversed number. It is another number you need, just look for it in the HashMap directly. Note that the number you find is not the first number. For example, if the target is 4 and a 2 is traversed, then the other 2 cannot be the previous one. 2.\n\n\nThe entire implementation steps are: first traverse the array once, establish a HashMap mapping, and then traverse again, start searching, and record the index when found.\n\n\nCode\n====\n\n\nJava\n\n\n* [Java](#)\n* [C++](#)\n* [Python](#)\n\n\n* ```\nimport java.util.HashMap;\n\nclass Two\\_Sum {\n\n    public static void main(String[] args) {\n\n        Two\\_Sum out = new Two\\_Sum();\n        Solution s = out.new Solution();\n\n        int[] a = {2, 7, 11, 15};\n        int target = 9;\n\n        int[] result = s.twoSum(a, target);\n\n        for (int each : result) {\n            System.out.println(each);\n        }\n    }\n\n    // time: O(N)\n    // space: O(N)\n    public class Solution {\n\n        public int[] twoSum(int[] nums, int target) {\n\n            // set up hashmap: remaining to original. thread-unsafe but for here is ok\n            HashMap<Integer, Integer> hm = new HashMap<>();\n\n            for (int i = 0; i < nums.length; i++) {\n\n                // if key in hm, result found.\n                // so that only one pass\n                if (hm.containsKey(nums[i])) {\n                    int otherIndex = hm.get(nums[i]);\n\n                    return new int[]{Math.min(i, otherIndex) + 1, Math.max(i, otherIndex) + 1};\n                }\n                // put new record into hashmap\n                else {\n                    hm.put(target - nums[i], i);\n                }\n            }\n\n            return null;\n        }\n\n    }\n}\n\n```\n* ```\nprintf("%s\\n","Todo".c\\_str());\n\n```\n* ```\nprint("Todo!")\n\n```\n\n\n'}




