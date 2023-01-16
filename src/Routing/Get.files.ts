import { Application, Response, Request } from "express";
import { FilesModel } from "../Models/Files.model";

export default function GetFiles(app: Application) {
    app.get("/API/files", async (req: Request, res: Response) => {
        //API utility for getting all the files in the db
        const response: any[] = await FilesModel.findAll({
            raw: true,
            logging: false,
        }); // should be a Sequelize response
        res.json(response);
    });
}
