# VOLNA

Проект VOLNA доработан под схему Vue 3 + Django REST Framework + PostgreSQL.

Фронтенд остаётся существующим Vue/Vite-приложением. Форма регистрации отправляет данные на Django API `/api/registrations/`. Бэкенд валидирует заявку, сохраняет её в PostgreSQL и показывает записи в Django Admin.

## Что добавлено

- Django backend в папке `backend/`.
- DRF endpoint `POST /api/registrations/`.
- Модель `Registration` для заявок с актуальными полями новой формы: ФИО, организация, направление обучения/должность, телефон, ВК и направление форума.
- Django Admin для просмотра и фильтрации регистраций.
- PostgreSQL-настройки через `.env`.
- CORS/CSRF/ALLOWED_HOSTS/SECRET_KEY через переменные окружения.
- Ограничения длины полей и серверная валидация данных.
- Защита от частого спама через DRF throttling.
- Минимальный ответ API без обратной отправки персональных данных.
- Docker Compose для локального запуска frontend/backend/database.
- Production-конфиги для Gunicorn, Nginx, Certbot и Ubuntu VPS.
- Скрипты резервного копирования PostgreSQL и media-файлов.

## Основные пути

```text
VOLNA/
  src/                         Vue frontend
  backend/                     Django backend
  backend/apps/registrations/  API, модель, serializer, admin
  deploy/nginx/                шаблоны Nginx
  docs/                        инструкции по запуску, Git и деплою
  scripts/                     backup-скрипты
  docker-compose.yml           локальная разработка
  docker-compose.prod.yml      production-вариант через Docker
  .env.example                 пример переменных окружения
```

## Быстрый локальный запуск через Docker Compose

```bash
cd ~/Desktop/VOLNA
cp .env.example .env
```

Открой `.env` и поменяй минимум:

```env
DJANGO_SECRET_KEY=любой-длинный-секретный-ключ-для-разработки
POSTGRES_PASSWORD=любой-пароль-для-локальной-базы
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Запусти контейнеры:

```bash
docker compose up --build
```

В отдельном Git Bash выполни миграции:

```bash
docker compose exec backend python manage.py migrate
```

Создай администратора:

```bash
docker compose exec backend python manage.py createsuperuser
```

Проверь:

```text
Frontend: http://127.0.0.1:5173
API health: http://127.0.0.1:8000/api/health/
Admin: http://127.0.0.1:8000/admin/
```

## Локальный запуск без Docker

Подробная инструкция находится в `docs/LOCAL_RUN_GIT_BASH.md`.

Кратко:

```bash
cd ~/Desktop/VOLNA
cp .env.example .env
npm install
npm run dev
```

В отдельном Git Bash:

```bash
cd ~/Desktop/VOLNA/backend
python -m venv .venv
source .venv/Scripts/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 127.0.0.1:8000
```

Для варианта без Docker всё равно нужен запущенный PostgreSQL и корректные значения `POSTGRES_*` в `.env`.

## API регистрации

Endpoint:

```http
POST /api/registrations/
Content-Type: application/json
```

Тело запроса актуальной формы:

```json
{
  "first_name": "Иван",
  "last_name": "Иванов",
  "patronymic": "Иванович",
  "organization": "СИЭУиП",
  "study_or_position": "Информационные системы",
  "phone": "+7 (999) 123-45-67",
  "vk_url": "https://vk.com/username",
  "forum_direction": "tech",
  "forum_direction_label": "Технологии и инновации",
  "info_consent": true,
  "personal_data_consent": true
}
```

Поле `forum_direction_label` принимается от frontend для совместимости интерфейса, но backend сам перепроверяет `forum_direction` и сохраняет корректное название направления. Старые поля `company` и `email` оставлены в модели как совместимые/исторические поля, чтобы миграция не была разрушительной для уже существующих данных.

Успешный ответ:

```json
{
  "id": 1,
  "detail": "Заявка на регистрацию успешно принята."
}
```

## Безопасность

Секреты не должны храниться в коде. Рабочий `.env` добавлен в `.gitignore`, а в репозитории должен лежать только `.env.example`.

Для production обязательно:

```env
DJANGO_DEBUG=False
DJANGO_SECRET_KEY=длинный-случайный-секрет
DJANGO_ALLOWED_HOSTS=ваш-домен.ru,www.ваш-домен.ru
DJANGO_CSRF_TRUSTED_ORIGINS=https://ваш-домен.ru,https://www.ваш-домен.ru
DJANGO_CORS_ALLOWED_ORIGINS=https://ваш-домен.ru,https://www.ваш-домен.ru
DJANGO_SECURE_SSL_REDIRECT=True
DJANGO_SECURE_HSTS_SECONDS=31536000
```

Не выводи персональные данные из формы в `console.log`, access-логи приложений или публичные ошибки.

## Документация

- `docs/LOCAL_RUN_GIT_BASH.md` — локальный запуск через Git Bash.
- `docs/GIT_BRANCH_WORKFLOW.md` — создание ветки `main_back`, коммиты и push.
- `docs/DEPLOY_UBUNTU.md` — будущий деплой на Ubuntu VPS / сервер института.
- `docs/SECURITY.md` — что сделано по безопасности и что проверить перед production.
