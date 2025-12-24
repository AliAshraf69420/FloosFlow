FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Copy prisma schema and migrations explicitly
COPY prisma/schema.prisma ./prisma/schema.prisma
COPY prisma/migrations ./prisma/migrations

RUN npx prisma generate

COPY . .

RUN chmod +x start.sh

EXPOSE 5000

ENV NODE_ENV=production

CMD ["./start.sh"]