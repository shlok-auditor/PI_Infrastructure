require('dotenv').config();
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Organization } from '../modules/organization/organization.entity';
import { User } from '../modules/user/user.entity';
import { Jobs } from '../modules/jobs/jobs.entity'

export const AppDataSource = new DataSource({
  name: 'default',
  host: process.env.POSTGRES_HOST,
  type: 'postgres',
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [
    'src/migrations/*{.ts,.js}',
  ],
  synchronize: true
});


