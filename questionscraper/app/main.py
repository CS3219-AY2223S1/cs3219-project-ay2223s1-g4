from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

@app.get("/")
def info():
    return {
        "GET: api/question/index": {
            "Function" : "Returns an Index of Questions and their corresponding difficulty",
            "Response" : "{'questions': [{'id': 1, 'question title': '2sum', 'difficulty' : 'easy', 'href': '/1.html', 'done' : False}] }"
        },
        "GET: api/question/id/{user_id}": {
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
    return {"questions": [
        {"id": 1, "question title": "2sum", "difficulty" : "easy", "href": "/1.html", "done" : False}
    ] }

@app.get("/api/question/id/{user_id}")
async def generate_question_id(user_id: str, difficulty='easy', tag: str | None = None, company: str | None = None):
    return {"id": 1}


@app.get("/api/question/{question_id}")
async def getSolution(question_id: int, solution: bool | None):
    print("HI")
    if solution:
        print("RESPOND HERE")
        return {'question_id': question_id, 'title':'2Sum', 'question': '''Given an array of integers, return **indices** of the two numbers such that they
 add up to a specific target.


You may assume that each input would have ***exactly*** one solution, and
 you may not use the *same* element twice.


**Example:**



```

Given nums = [2, 7, 11, 15], target = 9,

Because nums[**0**] + nums[**1**] = 2 + 7 = 9,
return [**0**, **1**].

```


### ''', 'solution': """Question
========


Formatted question description: <https://leetcode.ca/all/1.html>



```

Given an array of integers, find two numbers such that they add up to a specific target number.

The function twoSum should return indices of the two numbers such that they add up to the target,
where index1 must be less than index2. Please note that your returned answers (both index1 and
index2) are not zero-based.

You may assume that each input would have exactly one solution.

Input: numbers={2, 7, 11, 15}, target=9 Output: index1=1, index2=2


```

Algorithm
=========


Generally speaking, in order to increase the complexity of time, you need to use space for exchange. This is considered a trade off.


But here I only want to use linear time complexity to solve the problem, that is, only one number can be traversed, then another number, you can store it in advance and use a HashMap to establish the mapping between the number and its coordinate position.


Since the HashMap is a constant-level search efficiency, when traversing the array, use the target to subtract the traversed number. It is another number you need, just look for it in the HashMap directly. Note that the number you find is not the first number. For example, if the target is 4 and a 2 is traversed, then the other 2 cannot be the previous one. 2.


The entire implementation steps are: first traverse the array once, establish a HashMap mapping, and then traverse again, start searching, and record the index when found.


Code
====


Java



```
import java.util.HashMap;

class Two\_Sum {

    public static void main(String[] args) {

        Two\_Sum out = new Two\_Sum();
        Solution s = out.new Solution();

        int[] a = {2, 7, 11, 15};
        int target = 9;

        int[] result = s.twoSum(a, target);

        for (int each : result) {
            System.out.println(each);
        }
    }

    // time: O(N)
    // space: O(N)
    public class Solution {

        public int[] twoSum(int[] nums, int target) {

            // set up hashmap: remaining to original. thread-unsafe but for here is ok
            HashMap<Integer, Integer> hm = new HashMap<>();

            for (int i = 0; i < nums.length; i++) {

                // if key in hm, result found.
                // so that only one pass
                if (hm.containsKey(nums[i])) {
                    int otherIndex = hm.get(nums[i]);

                    return new int[]{Math.min(i, otherIndex) + 1, Math.max(i, otherIndex) + 1};
                }
                // put new record into hashmap
                else {
                    hm.put(target - nums[i], i);
                }
            }

            return null;
        }

    }
}
```

[All Problems](https://leetcode.ca/all/problems.html)
=====================================================


[All Solutions](https://leetcode.ca/blog)
========================================="""}
    else:
        print("RESPOND THERE")
        return {'question_id': question_id, 'title': '2Sum', 'question': '2Sum'}


# See PyCharm help at https://www.jetbrains.com/help/pycharm/
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8003)
