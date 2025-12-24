#!/bin/sh
set -e

echo "=== DATABASE_URL ==="
echo "$DATABASE_URL"

echo "=== Running Prisma migrate deploy ==="
npx prisma migrate deploy --schema=./prisma/schema.prisma

echo "=== Starting server ==="
npm start
