# Безопасность VOLNA

## Что реализовано

1. Секреты вынесены в `.env`.
2. Рабочий `.env` исключён из Git через `.gitignore`.
3. `DJANGO_SECRET_KEY` обязателен при `DJANGO_DEBUG=False`.
4. `DEBUG=False` предусмотрен для production.
5. `ALLOWED_HOSTS`, `CSRF_TRUSTED_ORIGINS` и `CORS_ALLOWED_ORIGINS` задаются только через `.env`.
6. API регистрации принимает только JSON.
7. Публичный API умеет только создавать заявку, списка заявок наружу нет.
8. API не возвращает обратно телефон, ФИО, компанию и email после успешной отправки.
9. DRF serializer проверяет обязательные поля, длину, формат email, формат телефона и согласия.
10. HTML-разметка и служебные символы в текстовых полях отклоняются.
11. Email сохраняется в нижнем регистре.
12. Повторная регистрация на один email блокируется.
13. Добавлен honeypot-параметр `website` для простых ботов.
14. Добавлен throttle `registrations`, по умолчанию `20/hour`.
15. Django Admin настроен отдельно от публичного API.
16. Для Sentry используется `send_default_pii=False`.
17. HTTPS и security headers подготовлены через Django settings и Nginx.

## Что проверить перед production

### .env

Проверь:

```env
DJANGO_DEBUG=False
DJANGO_SECRET_KEY=длинный-секрет
DJANGO_ALLOWED_HOSTS=реальный-домен.ru,www.реальный-домен.ru
DJANGO_CSRF_TRUSTED_ORIGINS=https://реальный-домен.ru,https://www.реальный-домен.ru
DJANGO_CORS_ALLOWED_ORIGINS=https://реальный-домен.ru,https://www.реальный-домен.ru
DJANGO_ADMIN_URL=неочевидный-admin-url/
DJANGO_SECURE_SSL_REDIRECT=True
DJANGO_SECURE_HSTS_SECONDS=31536000
```

### Администратор

1. Используй сложный пароль.
2. Не создавай общую учётку для всех.
3. После конкурса удали неиспользуемых администраторов.
4. Не отправляй данные заявок через мессенджеры без необходимости.

### Логи

Не добавляй `console.log(form)`, `print(request.data)` или логирование serializer errors вместе с полным payload.

### Backups

Проверь, что резервные копии реально создаются:

```bash
ls -lah /srv/volna/pg_backups
ls -lah /srv/volna/media_backups
```

Храни резервные копии не только на том же сервере, иначе при потере сервера потеряется и backup.

### Rate limit

Если спама будет много, уменьши лимит:

```env
DRF_REGISTRATION_THROTTLE_RATE=5/hour
```

После изменения перезапусти backend.

### Cloudflare

Если домен будет через Cloudflare DNS:

1. DNS A-запись должна указывать на IP сервера.
2. Для выпуска Let’s Encrypt можно временно включить DNS only.
3. После выпуска SSL можно включить проксирование, если оно нужно.
4. В SSL/TLS mode лучше использовать Full или Full strict, когда сертификат на сервере уже выпущен.
