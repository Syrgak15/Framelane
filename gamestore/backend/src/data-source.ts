import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "./entities/Product";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true,
    logging: true,
    entities: [Product],
});