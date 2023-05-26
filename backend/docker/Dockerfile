# pull official base image
FROM python:3.11-alpine

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV POETRY_VERSION=1.4.2
ENV BUILD_ENVIRONMENT=local
ARG APP_HOME=/app

RUN mkdir ${APP_HOME} && mkdir ${APP_HOME}/staticfiles && mkdir ${APP_HOME}/mediafiles
COPY . ${APP_HOME}
WORKDIR ${APP_HOME}

RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev libffi-dev

RUN pip install --upgrade pip && pip install "poetry==$POETRY_VERSION"

RUN poetry config virtualenvs.create false \
  && poetry install --no-interaction --no-ansi --no-root

COPY ./docker/entrypoint.sh ${APP_HOME}/docker/entrypoint.sh
RUN sed -i 's/\r$//g' ${APP_HOME}/docker/entrypoint.sh
RUN chmod +x ${APP_HOME}/docker/entrypoint.sh

COPY ./docker/start-celeryworker.sh ${APP_HOME}/docker/start-celeryworker.sh
RUN sed -i 's/\r$//g' ${APP_HOME}/docker/start-celeryworker.sh
RUN chmod +x ${APP_HOME}/docker/start-celeryworker.sh

COPY ./docker/start-celerybeat.sh ${APP_HOME}/docker/start-celerybeat.sh
RUN sed -i 's/\r$//g' ${APP_HOME}/docker/start-celerybeat.sh
RUN chmod +x ${APP_HOME}/docker/start-celerybeat.sh

COPY ./docker/start-flower.sh ${APP_HOME}/docker/start-flower.sh
RUN sed -i 's/\r$//g' ${APP_HOME}/docker/start-flower.sh
RUN chmod +x ${APP_HOME}/docker/start-flower.sh

ENTRYPOINT ["/app/docker/entrypoint.sh"]

WORKDIR ${APP_HOME}
