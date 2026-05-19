# ВОЛНА 2026 — лендинг (frontend)

Vue 3 + Vite.

## Запуск

```sh
npm install
npm run dev
```

Сборка: `npm run build` · превью: `npm run preview`

## Структура

- `src/` — компоненты, стили, composables, API-клиент регистрации
- `public/` — статика (изображения, SVG)

Переменная `VITE_API_BASE_URL` — базовый URL бэкенда (если API не проксируется через Vite). В dev запросы на `/api` проксируются на `http://127.0.0.1:8000` (см. `vite.config.js`).
