FROM node:18 AS development

WORKDIR /merrycrypto/frontend/src/app

COPY ["package.json", "yarn.lock*", "./"]

RUN yarn install

COPY . .

CMD ["ng", "serve", "--host", "0.0.0.0"]

RUN yarn run build

EXPOSE 4200


