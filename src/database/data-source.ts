import "reflect-metadata"
import { DataSource } from "typeorm"
import config from "../config"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.db.host,
    port: Number(config.db.port),
    username: config.db.username,
    password: config.db.password,
    database: config.db.name,
    ssl: true,
    synchronize: true,
    logging: false,
    entities: ["src/models/**/*.ts"],
    migrations: ["src/database/migrations/**/*.ts"],
    subscribers: []
})