import "reflect-metadata"
import { DataSource } from "typeorm"
import config from "../config"
import { Post } from "../models/post.model"
import { User } from "../models/user.model"
import { Comment } from "../models/comment.model"

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
    entities: [User, Comment, Post],
    migrations: ["src/database/migrations/**/*.ts"],
    subscribers: []
})