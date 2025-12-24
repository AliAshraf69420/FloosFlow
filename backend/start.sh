#!/bin/sh
set -e

echo "=== DATABASE_URL ==="
echo "$DATABASE_URL"

echo "=== Waiting for Postgres and running migrations ==="
RETRIES=30
while [ $RETRIES -gt 0 ]; do
  if npx prisma migrate deploy --schema=./prisma/schema.prisma 2>&1; then
    echo "Migrations applied successfully!"
    break
  else
    RETRIES=$((RETRIES-1))
    if [ $RETRIES -eq 0 ]; then
      echo "Failed to run migrations after 30 attempts!"
      exit 1
    fi
    echo "Migration failed, retrying in 2 seconds... ($RETRIES retries left)"
    sleep 2
  fi
done

echo "=== Starting server ==="
npm start
