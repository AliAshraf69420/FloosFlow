#!/bin/sh
set -e

echo "=== DATABASE_URL ==="
echo "$DATABASE_URL"

echo "=== Waiting for Postgres and running migrations ==="
RETRIES=30
MIGRATION_SUCCESS=false

while [ $RETRIES -gt 0 ]; do
  # Try migrate deploy first (if migrations exist)
  if npx prisma migrate deploy --schema=./prisma/schema.prisma 2>&1; then
    echo "Migrations applied successfully!"
    MIGRATION_SUCCESS=true
    break
  else
    # Check if it's because migrations don't exist
    if npx prisma migrate deploy --schema=./prisma/schema.prisma 2>&1 | grep -q "No migration found"; then
      echo "No migrations found, using db push instead..."
      if npx prisma db push --schema=./prisma/schema.prisma --accept-data-loss 2>&1; then
        echo "Database schema pushed successfully!"
        MIGRATION_SUCCESS=true
        break
      fi
    fi
    RETRIES=$((RETRIES-1))
    if [ $RETRIES -eq 0 ]; then
      echo "Failed to setup database after 30 attempts!"
      exit 1
    fi
    echo "Database setup failed, retrying in 2 seconds... ($RETRIES retries left)"
    sleep 2
  fi
done

if [ "$MIGRATION_SUCCESS" = false ]; then
  echo "Failed to setup database!"
  exit 1
fi

echo "=== Starting server ==="
npm start
