# Git workflow для ветки main_back

Все изменения нужно делать не напрямую в `main`, а в отдельной ветке `main_back`.

## 1. Перейти в проект

```bash
cd ~/Desktop/VOLNA
```

## 2. Проверить текущую ветку и изменения

```bash
git status
git branch
```

Если есть незакоммиченные изменения, сначала сохрани их:

```bash
git add .
git commit -m "Save current frontend state before backend integration"
```

## 3. Обновить main

```bash
git switch main
git pull origin main
```

## 4. Создать новую ветку main_back

```bash
git switch -c main_back
```

Если ветка уже есть локально:

```bash
git switch main_back
```

Если ветка уже есть на GitHub:

```bash
git fetch origin
git switch -c main_back origin/main_back
```

## 5. Проверить изменения

```bash
git status
```

## 6. Добавить файлы в коммит

```bash
git add .
```

## 7. Создать коммит

```bash
git commit -m "Add Django backend for registration API"
```

## 8. Отправить ветку на GitHub

```bash
git push -u origin main_back
```

## 9. После проверки создать Pull Request

Открой GitHub-репозиторий:

```text
https://github.com/classicbogg/VOLNA
```

Создай Pull Request:

```text
main_back -> main
```

Перед merge проверь:

```bash
npm run build
cd backend
python manage.py check
python manage.py migrate --check
```
