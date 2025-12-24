#!/bin/sh
set -e

echo "=== DATABASE_URL ==="
echo "$DATABASE_URL"

echo "=== Running Prisma migrate deploy ==="
npx prisma migrate deploy

echo "=== Starting server ==="
npm start
