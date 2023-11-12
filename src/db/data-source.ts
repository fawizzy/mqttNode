import "reflect-metadata";
import { DataSource } from "typeorm";
import * as entities from "./entities";
import dotenv from "dotenv";
dotenv.config();

export const connectionSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  ssl: true,
  entities: [...Object.values(entities)],
  migrations: [],
  subscribers: [],
});
