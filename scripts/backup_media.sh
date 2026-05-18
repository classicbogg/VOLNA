#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="${PROJECT_DIR:-/srv/volna}"
MEDIA_DIR="${MEDIA_DIR:-$PROJECT_DIR/backend/media}"
BACKUP_DIR="${BACKUP_DIR:-$PROJECT_DIR/media_backups}"

mkdir -p "$BACKUP_DIR"
STAMP="$(date +%Y-%m-%d_%H-%M-%S)"
FILE="$BACKUP_DIR/volna_media_${STAMP}.tar.gz"

tar -czf "$FILE" -C "$(dirname "$MEDIA_DIR")" "$(basename "$MEDIA_DIR")"
find "$BACKUP_DIR" -type f -name 'volna_media_*.tar.gz' -mtime +14 -delete

echo "$FILE"
