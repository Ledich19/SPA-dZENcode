FROM node:alpine AS development
WORKDIR /app
COPY package.json ./
RUN npm install

COPY prisma/ ./
COPY . .
RUN npm cache clean --force && rm -rf /tmp/*

FROM node:alpine            
WORKDIR /app
COPY --from=development /app .
EXPOSE ${PORT}
CMD npx prisma migrate dev && npm run start:prod
# #CMD ["sh", "-c", "until nc -z dev-db 5432; do echo 'Waiting for database to become available...'; sleep 1; done; npx prisma migrate dev && npm run start:prod"]