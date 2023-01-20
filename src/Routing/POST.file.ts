import { Application, Request, Response } from "express";
const multer = require("multer");
import { config } from "dotenv";
import { FilesModel } from "../Models/Files.model";

config();

const storage = multer.diskStorage({
    //change the file output so it remains the same filename in output.
    destination: function(req: Request, file: any, cb: Function) {
        cb(null, process.env.db_path);
    },
    filename: function(req: Request, file: any, cb: Function) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage }); //muter initialize

export default function PostFile(app: Application) {
    app.post(
        "/API/post", //url
        upload.single("filepost"), //multer
        (req: Request, res: Response) => {
            res.sendStatus(204);
            console.log(req.file?.originalname);
            FilesModel.findOrCreate({
                where: { absPath: process.env?.db_path + req.file?.originalname },
                logging: false,
            });
        }
    );
}
