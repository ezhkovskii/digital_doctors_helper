# Digital Doctor's Helper. Backend

## Запуск локально

### С докером
    docker-compose -f docker-compose.yml up --build
    docker exec -it <container_name> python manage.py createsuperuser


## Запуск прода
 - Скопировать, переименовать [.env.prod](envs/.env.prod.) и [.env.prod.db](envs/.env.prod.db) и заполнить данными
 - 
       docker-compose -f docker-compose.prod.yml up --build
       docker exec -it <container_name> python manage.py createsuperuser

##  Запуск тестов
 - Тесты можно запустить в докер-контейнере командой python manage.py test
 - Можно и не в докере, но нужно прописать свои переменные окружения в .env.dev (или в .env , если запускали make_env_file.py)

## Загрузка фикстур
     python manage.py loaddata medical_entities/fixtures/ma.json
     python manage.py loaddata medical_entities/fixtures/diagnoses.json

## Выгрузка фикстур 
    python manage.py dumpdata --indent 4 medical_entities.Diagnosis > medical_entities/fixtures/diagnoses.json
    python manage.py dumpdata --indent 4 medical_entities.MedicalAppointments > medical_entities/fixtures/ma.json

## Загрузка назначений из файла medical.xlsx
     python manage.py load_medical_entities