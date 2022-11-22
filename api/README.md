## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

1. Create database (merrycrypto)
2. Install packages
3. Set up env variables
4. Specify JWT secret
5. Migrate tables

```bash
# to install packages
$ yarn install

# set up env variables
$ touch development.env

# set up JWT token
$ touch src/config.ts

# create migrations
$ yarn db:migrate 
```

```env
// in development.env
DB_PASSWORD=""
DB_USERNAME=""
```

```ts
// in src/config.ts
export const JWT_SECRET = 'super-secret';
```

## Running the app

```bash
# development
$ yarn start
```

## Test

