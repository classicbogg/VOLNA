# Интеграция frontend-изменений с backend VOLNA

## Что изменилось в форме регистрации

Новая frontend-форма отправляет JSON на `POST /api/registrations/` со следующими актуальными полями:

```json
{
  "last_name": "Иванов",
  "first_name": "Иван",
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

Frontend использует `src/api/registration.js`, который отправляет данные в формате `application/json`. Базовый адрес API берётся из `VITE_API_BASE_URL`. Если переменная пустая, запрос уходит на относительный путь `/api/registrations/`, что подходит для production-схемы через Nginx reverse proxy.

## Что изменено на backend

Backend-модель `Registration` расширена под новую форму:

- `organization` — учебное заведение или организация;
- `study_or_position` — направление обучения или должность;
- `vk_url` — ссылка на профиль ВКонтакте;
- `forum_direction` — ключ направления форума;
- `forum_direction_label` — человекочитаемое название направления.

Старые поля `company` и `email` оставлены как совместимые/исторические поля, чтобы миграция не удаляла уже существующие данные.

## Миграции

Добавлена миграция:

```text
backend/apps/registrations/migrations/0002_registration_forum_direction_and_more.py
```

Миграция добавляет новые поля, делает старое поле `email` необязательным и переносит старое значение `company` в `organization`, если в базе уже были заявки.

## Проверки перед деплоем

Перед деплоем на сервер нужно выполнить:

```bash
python manage.py migrate
python manage.py collectstatic --noinput
npm ci
npm run build
```

Для Docker Compose production-сценария отдельные изменения в `docker-compose.prod.yml` и Nginx не потребовались: frontend по-прежнему собирается в статические файлы, а `/api/`, `/admin/`, `/static/` и `/media/` уже проксируются/отдаются корректно.
