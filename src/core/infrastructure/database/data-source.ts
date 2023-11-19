import { DataSource } from 'typeorm';

export const TypeORMDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 1234,
  username: 'test',
  password: 'test',
  database: 'test',
  synchronize: false,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: [],
});
