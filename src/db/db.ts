import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();
const { database, db_admin, db_user, db_pass, db_host } = process.env;
export const db = new Sequelize(database, db_user, db_pass, {
    host: db_host,
    dialect: "mysql",
});
