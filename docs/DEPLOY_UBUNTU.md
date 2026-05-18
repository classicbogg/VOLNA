# Будущий деплой VOLNA на Ubuntu VPS / сервер института

Инструкция рассчитана на Ubuntu Server 24.04 LTS. Домен в примерах замени на реальный домен проекта.

## 1. Подготовить сервер

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y python3 python3-venv python3-pip python3-dev build-essential libpq-dev postgresql postgresql-contrib nginx git curl unzip certbot python3-certbot-nginx
```

## 2. Создать пользователя и папку проекта

```bash
sudo adduser volna
sudo usermod -aG sudo volna
sudo mkdir -p /srv/volna
sudo chown -R volna:volna /srv/volna
```

Перейди под пользователя проекта:

```bash
sudo su - volna
```

## 3. Забрать проект с GitHub

```bash
cd /srv
git clone https://github.com/classicbogg/VOLNA.git volna
cd /srv/volna
git switch main_back
```

Если ветка уже влита в `main`:

```bash
git switch main
```

## 4. Создать production .env

```bash
cd /srv/volna
cp .env.example .env
nano .env
```

Минимальный production-вариант:

```env
VITE_API_BASE_URL=
DJANGO_DEBUG=False
DJANGO_SECRET_KEY=замени-на-длинный-случайный-секрет
DJANGO_ALLOWED_HOSTS=example.ru,www.example.ru
DJANGO_CSRF_TRUSTED_ORIGINS=https://example.ru,https://www.example.ru
DJANGO_CORS_ALLOWED_ORIGINS=https://example.ru,https://www.example.ru
DJANGO_ADMIN_URL=secure-admin-panel/
DJANGO_SECURE_SSL_REDIRECT=True
DJANGO_SECURE_HSTS_SECONDS=31536000
DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS=True
DJANGO_SECURE_HSTS_PRELOAD=False
POSTGRES_DB=volna
POSTGRES_USER=volna
POSTGRES_PASSWORD=замени-на-сильный-пароль
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
SENTRY_DSN=
SENTRY_ENVIRONMENT=production
SENTRY_TRACES_SAMPLE_RATE=0.0
```

Сгенерировать SECRET_KEY можно так:

```bash
python3 - <<'PY'
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
PY
```

Если Django ещё не установлен, можно временно сгенерировать случайную строку через OpenSSL:

```bash
openssl rand -base64 48
```

## 5. Настроить PostgreSQL

```bash
sudo -u postgres psql
```

Внутри psql:

```sql
CREATE DATABASE volna;
CREATE USER volna WITH PASSWORD 'замени-на-сильный-пароль';
ALTER ROLE volna SET client_encoding TO 'utf8';
ALTER ROLE volna SET default_transaction_isolation TO 'read committed';
ALTER ROLE volna SET timezone TO 'Europe/Moscow';
GRANT ALL PRIVILEGES ON DATABASE volna TO volna;
\q
```

Для PostgreSQL 15+:

```bash
sudo -u postgres psql -d volna
```

```sql
GRANT ALL ON SCHEMA public TO volna;
\q
```

## 6. Настроить backend

```bash
cd /srv/volna/backend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
python manage.py check --deploy
```

## 7. Настроить Gunicorn systemd

```bash
sudo nano /etc/systemd/system/volna-gunicorn.service
```

Вставь:

```ini
[Unit]
Description=VOLNA Gunicorn Django service
After=network.target postgresql.service

[Service]
User=volna
Group=www-data
WorkingDirectory=/srv/volna/backend
EnvironmentFile=/srv/volna/.env
ExecStart=/srv/volna/backend/.venv/bin/gunicorn config.wsgi:application --bind 127.0.0.1:8000 --workers 3 --timeout 60
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Запусти службу:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now volna-gunicorn
sudo systemctl status volna-gunicorn --no-pager
```

Проверка backend локально на сервере:

```bash
curl http://127.0.0.1:8000/api/health/
```

## 8. Собрать frontend

Установи Node.js 22 LTS или актуальную разрешённую версию проекта.

```bash
cd /srv/volna
npm ci
npm run build
mkdir -p /srv/volna/frontend-dist
cp -r dist/* /srv/volna/frontend-dist/
```

## 9. Настроить Nginx

Скопируй шаблон:

```bash
sudo cp /srv/volna/deploy/nginx/volna-host.conf /etc/nginx/sites-available/volna
sudo nano /etc/nginx/sites-available/volna
```

В файле замени:

```text
example.ru www.example.ru
```

на реальный домен.

Активируй сайт:

```bash
sudo ln -s /etc/nginx/sites-available/volna /etc/nginx/sites-enabled/volna
sudo nginx -t
sudo systemctl reload nginx
```

## 10. Выпустить HTTPS через Certbot

До Certbot проверь, что DNS домена указывает на сервер. Если используешь Cloudflare DNS, на время выпуска сертификата лучше поставить DNS-запись в режим DNS only или убедиться, что проксирование не мешает проверке.

```bash
sudo certbot --nginx -d example.ru -d www.example.ru
```

После успешного выпуска проверь автообновление:

```bash
sudo certbot renew --dry-run
```

## 11. Проверить production

```bash
curl -I https://example.ru
curl https://example.ru/api/health/
sudo systemctl status volna-gunicorn --no-pager
sudo journalctl -u volna-gunicorn -n 80 --no-pager
```

Открой:

```text
https://example.ru
https://example.ru/secure-admin-panel/
```

## 12. Настроить backup PostgreSQL и media

Сделай скрипты исполняемыми:

```bash
chmod +x /srv/volna/scripts/backup_postgres.sh
chmod +x /srv/volna/scripts/backup_media.sh
```

Проверь вручную:

```bash
PROJECT_DIR=/srv/volna /srv/volna/scripts/backup_postgres.sh
PROJECT_DIR=/srv/volna /srv/volna/scripts/backup_media.sh
```

Открой cron:

```bash
crontab -e
```

Добавь:

```cron
15 2 * * * PROJECT_DIR=/srv/volna /srv/volna/scripts/backup_postgres.sh >> /srv/volna/logs/backup_postgres.log 2>&1
45 2 * * * PROJECT_DIR=/srv/volna /srv/volna/scripts/backup_media.sh >> /srv/volna/logs/backup_media.log 2>&1
```

Создай папку логов:

```bash
mkdir -p /srv/volna/logs
```

## 13. Uptime Kuma

В Uptime Kuma добавь HTTP(s)-monitor:

```text
https://example.ru/api/health/
```

Ожидаемый ответ:

```json
{"status":"ok"}
```

## 14. Sentry

Если появится DSN проекта Sentry, добавь его в `.env`:

```env
SENTRY_DSN=https://...
SENTRY_ENVIRONMENT=production
SENTRY_TRACES_SAMPLE_RATE=0.0
```

Перезапусти Gunicorn:

```bash
sudo systemctl restart volna-gunicorn
```

## Альтернатива: production через Docker Compose

Если на сервере решено запускать всё через Docker Compose, используй:

```bash
cd /srv/volna
cp .env.example .env
nano .env
```

В `.env` обязательно поставь production-значения `DJANGO_DEBUG=False`, домены, сильные пароли и `DJANGO_SECRET_KEY`.

Запуск:

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

Миграции и static-файлы:

```bash
docker compose -f docker-compose.prod.yml exec backend python manage.py migrate
docker compose -f docker-compose.prod.yml exec backend python manage.py collectstatic --noinput
docker compose -f docker-compose.prod.yml exec backend python manage.py createsuperuser
```

Проверка:

```bash
docker compose -f docker-compose.prod.yml ps
curl http://127.0.0.1/api/health/
```

Для HTTPS в этом варианте обычно ставят внешний Nginx на хосте или добавляют отдельную схему Certbot-контейнера. Для сервера института проще и прозрачнее использовать классический вариант с host Nginx + systemd Gunicorn, описанный выше.
