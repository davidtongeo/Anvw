import { db } from "../db/db";
import { Application, Request, Response } from "express";
async function Statusdb(): Promise<string> {
    try {
        await db.authenticate();
        return "db: OK";
    } catch (e) {
        return `error ocurred... ${e}`;
    }
}
export default function TestServer(app: Application) {
    app.get("/API/test", async (req: Request, res: Response) => {
        //API utility for checking the status of db
        res.send(`db status : ${await Statusdb()}`);
    });
}
