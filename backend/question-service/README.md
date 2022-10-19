# Question Service

Performs Scraping, question service and history for users

Setup:

1. Have Python installed on the system
2. Install poetry


    curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/install-poetry.py | env POETRY_VERSION=1.1.9 python -
3. poetry install
4. Run the scraper which uses Beautifulsoup4 to scrape leetcode.ca for questions and answers
   1. Run this scraping script: 


    poetry python app/soupScrape.py
5. Run the API Service

   1.  Connect the FastAPI Middleware


    poetry python main.py


    

[//]: # (    uvicorn main:app --host 0.0.0.0 --port 80)


