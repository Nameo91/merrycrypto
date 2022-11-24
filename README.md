## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Backend (NestJS) installation

Go to api folder for Nest JS setup. Perform the following instructions in that folder
```bash
$ cd api
```

1. Create Database in PSQL
```bash
$ createdb merrycrypto

# or run command below to specify psql username (if it is different to mac username)
$ createdb -U username merrycrypto
```
2. Install packages
```bash
$ yarn install
```
3. Set up env variables
```bash
$ touch development.env
```
Specify database username and password in development.env file
```env
DB_PASSWORD=""
DB_USERNAME=""
```
4. Specify JWT secret
```bash
$ touch src/config.ts
```

In src/config.ts provide secret for JSON Web Token, it can be any string.
```ts
export const JWT_SECRET = 'super-secret';
```

5. Migrate tables
```bash
$ yarn db:migrate 
```

6. Setting up Crypto Compare API
```
code .env 

CRYPTOCOMPARE_API_KEY=... <- Insert your own api key

```

## Frontend (Angular) installation
```bash
$ cd frontend
$ yarn install
```


## Running the app

```bash
# development
$ cd api
$ yarn start
```

## Test

