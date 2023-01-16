import { DataTypes } from "sequelize";
import { db } from "../db/db";
import fs from "fs";

export const FilesModel = db.define("Files", {
    absPath: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});
export async function ClearDatabase() {
    await FilesModel.destroy({
        truncate: true,
        logging: false,
    });
}
async function GetAllPaths(dir: string) {
    //this function should return all paths in a directory
    const paths: string[] = []; // variable where the paths are storaged in.
    const dirout: string[] = fs.readdirSync(dir);
    for await (let file of dirout) {
        paths.push(file); //pushing files to the **paths** variable
    }
    return paths;
}
export async function PushToDatabase(dir: any) {
    //this function should push all path to the database if the path in cuestion does not exist
    const filesDir: string[] = await GetAllPaths(dir);
    filesDir.forEach(async (element) => {
        const DirElement: boolean = fs.lstatSync(dir + element).isDirectory(); //if the element is a directory then recursibly get all the files from that directory ** DirElement**
        if (DirElement) {
            PushToDatabase(dir + element + "/");
            return;
        }
        //Create rows for every file
        await FilesModel.findOrCreate({
            where: {
                absPath: dir + element.toString(),
            },
            logging: false,
        });
    });
}
