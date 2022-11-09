FROM python:3.10

ENV PIP_DISABLE_PIP_VERSION_CHECK=on

RUN pip3 install poetry

WORKDIR /app
COPY poetry.lock pyproject.toml /app/

RUN poetry config virtualenvs.create false
RUN poetry install --no-interaction

EXPOSE 8003

COPY . /app

CMD ["poetry", "run", "python3", "main.py", "scrapeReset"]
