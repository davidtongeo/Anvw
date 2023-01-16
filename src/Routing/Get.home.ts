import { Application, Response, Request } from "express";
import { config } from "dotenv";
config();
const { project_path } = process.env;
export default function home(app: Application) {
    app.get("/", async (req: Request, res: Response) => {
        //HOME url
        res.sendFile(project_path + "/src/frontend/index.html");
    });
}
