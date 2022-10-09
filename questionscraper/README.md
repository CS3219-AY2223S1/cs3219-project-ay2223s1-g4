# Question Service

Performs Scraping, question service and history for users

Setup:

1. Have Python installed on the system
2. Install poetry


    curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/install-poetry.py | env POETRY_VERSION=1.1.9 python -
3. poetry install
   1. 2 Ways to Connect


    python main.py


    # OR  
    uvicorn main:app --host 0.0.0.0 --port 80


