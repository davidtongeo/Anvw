import { db } from "./db";
import {
    FilesModel,
    PushToDatabase,
    ClearDatabase,
} from "../Models/Files.model";
import { config } from "dotenv";
config();
const { db_path } = process.env;
export async function Auth() {
    try {
        console.log("initialized database");
        await db.authenticate({ logging: false });
        console.log("db authenticated");
        await FilesModel.sync({ logging: false });
        console.log("table syncronized");
        await ClearDatabase();
        console.log("Database cleared");
        await PushToDatabase(db_path);
        console.log("All Paths added to *Files* Table");
    } catch (e) {
        throw e;
    }
}
