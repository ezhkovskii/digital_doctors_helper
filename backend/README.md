# Digital Doctor's Helper. Backend

## Запуск локально

### С докером
    docker-compose -f docker-compose.yml up --build
    docker exec -it <container_name> python manage.py createsuperuser


### Без докера
 - Установить poetry 
 -
       poetry install
       pre-commit install
       poetry shell
 - Добавить переменную окружения BUILD_ENVIRONMENT=local
 - Запустить скрипт make_env_file.py, который создаст файл .env в корневой папке
 - Прописать в .env свои переменные окружения для базы данных

## Запуск прода
 - Скопировать, переименовать [.env.prod](envs/.env.prod.) и [.env.prod.db](envs/.env.prod.db) и заполнить данными
 - 
       docker-compose -f docker-compose.prod.yml up --build
       docker exec -it <container_name> python manage.py createsuperuser

##  Запуск тестов
 - Тесты можно запустить в докер-контейнере командой python manage.py test
 - Можно и не в докере, но нужно прописать свои переменные окружения в .env.dev (или в .env , если запускали make_env_file.py)
