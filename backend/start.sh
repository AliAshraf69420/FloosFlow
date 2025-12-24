#!/bin/sh

echo "=== DATABASE_URL ==="
echo "$DATABASE_URL"

echo "=== Waiting a few seconds for Postgres to be ready ==="
sleep 5

echo "=== Setting up database schema ==="
# Check if migrations directory exists and has migration files
if [ -d "./prisma/migrations" ] && [ -n "$(find ./prisma/migrations -mindepth 1 -type d 2>/dev/null)" ]; then
  echo "Migrations found, running migrate deploy..."
  npx prisma migrate deploy --schema=./prisma/schema.prisma
else
  echo "No migrations found, using db push to create schema..."
  npx prisma db push --schema=./prisma/schema.prisma --accept-data-loss
fi

echo "=== Starting server ==="
set -e
node index.js
