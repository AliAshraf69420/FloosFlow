FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Copy prisma directory (will include migrations if they exist)
COPY prisma ./prisma/

RUN npx prisma generate

# Copy rest of the app
COPY . .

RUN chmod +x start.sh

EXPOSE 5000

ENV NODE_ENV=production

CMD ["./start.sh"]