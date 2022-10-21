# Question Service

## About

Performs scraping, question service and history for users.

## Setup

1. Have python 3.10+ installed on the system
2. Install poetry
    ``` bash 
    $ curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/install-poetry.py | env POETRY_VERSION=1.1.9 python -
    $ poetry env use python3
    ```
    If you face issues, see [here](https://www.itsupportwale.com/blog/how-to-upgrade-to-python-3-10-on-ubuntu-18-04-and-20-04-lts/) or [here](https://realpython.com/dependency-management-python-poetry/)
3. Run the following
    ``` bash 
   poetry install
    ```
4. Run the scraper which uses BeautifulSoup4 to scrape leetcode.ca for questions and answers using this scraping script: 
    ``` bash 
    poetry run python3 app/soupScrape.py
    ```
5. Run the API Service and connect the FastAPI Middleware
    ``` bash
    $ poetry run python3 main.py
    [//]: # (    uvicorn main:app --host 0.0.0.0 --port 80)
    ```
