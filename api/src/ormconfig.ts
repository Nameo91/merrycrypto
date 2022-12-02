import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import * as fs from 'fs';
import * as dotenv from 'dotenv';

const environment = process.env.NODE_ENV || 'development';
const data: any = dotenv.parse(fs.readFileSync(`${environment}.env`));

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'database',
  port: 5432,
  username: data.DB_USERNAME,
  password: data.DB_PASSWORD,
  database: 'merrycrypto',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: ['dist/migrations/**/*{.ts,.js}'],
};

export default config;
