FROM node:latest
WORKDIR /app
COPY package.json ./
RUN npm install

COPY prisma/ ./
COPY . .
EXPOSE ${PORT}
CMD npx prisma migrate dev && npm run start:prod
# #CMD ["sh", "-c", "until nc -z dev-db 5432; do echo 'Waiting for database to become available...'; sleep 1; done; npx prisma migrate dev && npm run start:prod"]