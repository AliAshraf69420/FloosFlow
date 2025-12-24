FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma/

RUN npx prisma generate

COPY . .

RUN chmod +x start.sh

EXPOSE 5000

ENV NODE_ENV=production

CMD ["./start.sh"]
