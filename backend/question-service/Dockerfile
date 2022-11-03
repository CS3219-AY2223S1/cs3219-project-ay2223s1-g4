FROM python:latest

ENV PIP_DISABLE_PIP_VERSION_CHECK=on

RUN pip3 install poetry

WORKDIR /app
COPY poetry.lock pyproject.toml /app/

RUN poetry config virtualenvs.create false
RUN poetry install --no-interaction

COPY . /app

RUN poetry run python3 app/soupScrape.py
CMD ["poetry", "run", "python3", "main.py"]
