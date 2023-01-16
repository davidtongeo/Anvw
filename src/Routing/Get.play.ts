import { Application, Request, Response } from "express";
import { createReadStream } from "fs";

function streamf(file: any, endpoint: Response) {
    //create a simple read stream
    createReadStream(file).pipe(endpoint);
}
function ResponseHTML(text: string) {
    return `
 <!DOCTYPE html>
 <html>
   <head>
    <title>sample</title>
   </head>
   <body>
   <video src="${text}" controls></vide>
   </body>
 </html>`;
}

export default function GetVideo(app: Application) {
    app.get("/API/play/", async (req: Request, res: Response) => {
        //API utility for streaming source to through the URL
        const { path } = req.query;
        try {
            streamf(path, res); // try steaming the file through the url
        } catch (e) {
            console.log(e);
        }
    });
    app.get("/watch", async (req: Request, res: Response) => {
        //utility for playing source within web browser client
        const { path } = req.query;
        res.send(ResponseHTML("/API/play?path=" + path)); //send a template
    });
}
