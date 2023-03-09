# MerryCrypto

This project serves as a tool for collecting and organising cryptocurrency data. It includes a built-in portfolio manager and is designed with a festive twist, featuring Christmas theme.

# Description

Our user story:
- Users can sign-up to the platform.
- Users can log in and sign out of the platform.
- Users can track all their cryptocurrency purchases.
- Users can favourite cryptocurrencies and view them in their watchlist.
- Users can see live crypto data, latest news and tweets.

To obtain real-time data, this project makes use of 10 distinct API calls from three different providers.

# Technologies

Merrycrypto was developed using TypeScript and features a frontend built with Angular and a backend built with NestJS. 

# Project Setup

1. Fork this repository
2. Clone your fork to your local machine

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

# Running the application

```bash
# development
$ cd api
$ yarn start
```
Click the DemoDay below and Enjoy our showcase on Makers Demo Day
[DemoDay](https://youtu.be/jNPUt79UpsA?t=2056)

# How to contribute ❤

Follow the Project Setup / Running the application steps above to build upon our exsiting project. Open source contributions can include translating to other languages, adding new features, and improving and expanding test functionality.

We welcome any and all contributions. 

