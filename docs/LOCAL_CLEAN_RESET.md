# Чистый локальный запуск VOLNA через Git Bash и Docker Desktop

Эта инструкция нужна, если frontend на `127.0.0.1:5173` не открывается, а backend на `127.0.0.1:8000/api/health/` работает.

## 1. Остановить проект

```bash
docker compose down --remove-orphans
```

## 2. Полностью удалить локальные Docker-данные VOLNA

Команда ниже удалит локальную базу PostgreSQL, media/static volumes и node_modules volume только этого compose-проекта.

```bash
docker compose down -v --remove-orphans
```

## 3. Проверить, что старые volume удалены

```bash
docker volume ls | grep volna || true
```

Если что-то осталось, можно удалить точечно:

```bash
docker volume rm volna_postgres_data volna_frontend_node_modules volna_backend_media volna_backend_static 2>/dev/null || true
```

## 4. Запустить заново

```bash
docker compose up --build
```

Первый запуск может идти несколько минут, потому что frontend скачивает npm-зависимости. Нельзя закрывать окно, пока не появится строка Vite вида:

```text
Local:   http://localhost:5173/
```

## 5. Проверить адреса

Сайт:

```text
http://127.0.0.1:5173
```

Backend healthcheck:

```text
http://127.0.0.1:8000/api/health/
```

Django Admin:

```text
http://127.0.0.1:8000/admin/
```

## 6. Создать администратора после чистой установки

Во втором окне Git Bash:

```bash
docker compose exec backend python manage.py createsuperuser
```

## 7. Если frontend снова не поднялся

Посмотреть логи только frontend:

```bash
docker compose logs -f frontend
```

Проверить статус контейнеров:

```bash
docker compose ps
```
