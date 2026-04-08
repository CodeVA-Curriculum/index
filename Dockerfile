FROM node:25-alpine AS builder

RUN mkdir /app && mkdir /app/data

COPY . /app

RUN cd /app && yarn install && echo "DATABASE_URL=/app/data/local.db" > /app/.env && yarn build

FROM node:25-alpine

RUN mkdir /app

COPY --from=builder /app/build /app/build
COPY --from=builder /app/package.json /app/yarn.lock /app/

RUN cd /app && yarn install && yarn cache clean

WORKDIR /app

CMD ["node", "build/index.js"]
