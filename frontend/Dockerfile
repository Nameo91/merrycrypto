# Stage 1: build
FROM node:18 AS development

WORKDIR /merrycrypto/frontend/src/app

COPY ["package.json", "yarn.lock*", "./"]

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 4200
