import { Application, Request, Response } from "express";
import { FilesModel } from "../Models/Files.model";
import { unlink } from "fs";
export default function DeleteIndex(app: Application) {
    app.delete("/API/delete", async (req: Request, res: Response) => {
        const { url } = req.query;
        console.log(url);
        const response = await FilesModel.findOne({
            attributes: ["absPath"],
            where: { id: url },
        });
        unlink(await response?.toJSON().absPath, () => { });
        await FilesModel.destroy({
            where: { id: url },
            logging: false,
        });
    });
}
