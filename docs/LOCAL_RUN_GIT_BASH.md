# Локальный запуск VOLNA через Git Bash

Инструкция рассчитана на рабочую папку:

```bash
cd ~/Desktop/VOLNA
```

## Вариант 1. Запуск через Docker Compose

Это самый удобный вариант, потому что PostgreSQL поднимается автоматически.

### 1. Создать .env

```bash
cp .env.example .env
```

Открой `.env` в VS Code:

```bash
code .env
```

Поставь минимум:

```env
DJANGO_DEBUG=True
DJANGO_SECRET_KEY=local-dev-secret-key-change-this
POSTGRES_DB=volna
POSTGRES_USER=volna
POSTGRES_PASSWORD=local-dev-password
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### 2. Запустить проект

```bash
docker compose up --build
```

### 3. Выполнить миграции

Открой второй Git Bash:

```bash
cd ~/Desktop/VOLNA
docker compose exec backend python manage.py migrate
```

### 4. Создать администратора

```bash
docker compose exec backend python manage.py createsuperuser
```

### 5. Проверить работу

Открой в браузере:

```text
http://127.0.0.1:5173
http://127.0.0.1:8000/api/health/
http://127.0.0.1:8000/admin/
```

### 6. Проверить отправку регистрации

1. Открой сайт на `http://127.0.0.1:5173`.
2. Нажми кнопку регистрации.
3. Заполни форму.
4. Отправь заявку.
5. Открой `http://127.0.0.1:8000/admin/`.
6. Перейди в раздел «Регистрации».
7. Проверь, что запись появилась.

## Вариант 2. Запуск без Docker

Для этого варианта PostgreSQL должен быть установлен и запущен на компьютере.

### 1. Установить зависимости фронтенда

```bash
cd ~/Desktop/VOLNA
npm install
```

### 2. Создать .env

```bash
cp .env.example .env
code .env
```

Проверь значения:

```env
DJANGO_DEBUG=True
DJANGO_SECRET_KEY=local-dev-secret-key-change-this
POSTGRES_DB=volna
POSTGRES_USER=volna
POSTGRES_PASSWORD=твой_пароль_postgresql
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
VITE_API_BASE_URL=
```

Если `VITE_API_BASE_URL` пустой, Vite будет проксировать `/api` на `http://127.0.0.1:8000` через `vite.config.js`.

### 3. Создать Python-окружение

```bash
cd ~/Desktop/VOLNA/backend
python -m venv .venv
source .venv/Scripts/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
```

Если команда `python` не найдена, проверь установку Python и PATH. В Windows часто помогает команда:

```bash
py -3.12 -m venv .venv
source .venv/Scripts/activate
```

### 4. Подготовить базу PostgreSQL

Пример через psql:

```bash
psql -U postgres
```

Внутри psql:

```sql
CREATE DATABASE volna;
CREATE USER volna WITH PASSWORD 'local-dev-password';
ALTER ROLE volna SET client_encoding TO 'utf8';
ALTER ROLE volna SET default_transaction_isolation TO 'read committed';
ALTER ROLE volna SET timezone TO 'Europe/Moscow';
GRANT ALL PRIVILEGES ON DATABASE volna TO volna;
\q
```

Для PostgreSQL 15+ может понадобиться выдать права на схему:

```bash
psql -U postgres -d volna
```

```sql
GRANT ALL ON SCHEMA public TO volna;
\q
```

### 5. Выполнить миграции и создать администратора

```bash
cd ~/Desktop/VOLNA/backend
source .venv/Scripts/activate
python manage.py migrate
python manage.py createsuperuser
```

### 6. Запустить backend

```bash
python manage.py runserver 127.0.0.1:8000
```

### 7. Запустить frontend

Открой второй Git Bash:

```bash
cd ~/Desktop/VOLNA
npm run dev
```

Проверь:

```text
http://127.0.0.1:5173
http://127.0.0.1:8000/admin/
```
