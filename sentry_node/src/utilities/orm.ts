require('dotenv').config();
// import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const source = new DataSource({
  name: 'default',
  host: process.env.POSTGRES_HOST,
  type: 'postgres',
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD?.toString(),
  database: process.env.POSTGRES_DB,
  entities: [__dirname + '/../**/*.entity.js'] ,
  migrations: [
    'src/migrations/*.ts',
  ],
  synchronize: true
})

source.initialize();