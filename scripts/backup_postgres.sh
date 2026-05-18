#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="${PROJECT_DIR:-/srv/volna}"
BACKUP_DIR="${BACKUP_DIR:-$PROJECT_DIR/pg_backups}"
ENV_FILE="${ENV_FILE:-$PROJECT_DIR/.env}"

if [ -f "$ENV_FILE" ]; then
  set -a
  source "$ENV_FILE"
  set +a
fi

mkdir -p "$BACKUP_DIR"
STAMP="$(date +%Y-%m-%d_%H-%M-%S)"
FILE="$BACKUP_DIR/volna_${STAMP}.sql.gz"

PGPASSWORD="${POSTGRES_PASSWORD:?POSTGRES_PASSWORD is required}" \
pg_dump \
  --host="${POSTGRES_HOST:-127.0.0.1}" \
  --port="${POSTGRES_PORT:-5432}" \
  --username="${POSTGRES_USER:?POSTGRES_USER is required}" \
  --dbname="${POSTGRES_DB:?POSTGRES_DB is required}" \
  --no-owner \
  --no-privileges \
  | gzip > "$FILE"

find "$BACKUP_DIR" -type f -name 'volna_*.sql.gz' -mtime +14 -delete

echo "$FILE"
