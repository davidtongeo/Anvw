import inquirer from "inquirer";
import mysql from "mysql2";
import { existsSync, createWriteStream } from "fs";
import { resolve, join } from "path";
function GetRealPath(filepath: string) {
    const OsHOME = process.env.plataform?.startsWith("win32")
        ? process.env.userProfile
        : process.env.HOME;
    //this function will return the real extended path
    if (filepath[0] === "~") {
        return OsHOME + filepath.slice(1);
    }
    return filepath;
}
(async () => {
    if (!existsSync(".//.env")) {
        const { db_path, db_port, db_pass, db_user, db_host } =
            await inquirer.prompt([
                {
                    name: "db_user",
                    message: "your mysql user",
                    default: "root",
                },
                {
                    name: "db_pass",
                    message: "your mysql password",
                    default: "password",
                },
                {
                    name: "db_path",
                    message: "where do you want your files to be in ?",
                    default: "~/Documents",
                },
                {
                    name: "db_port",
                    message: "port",
                    default: 8080,
                },
                {
                    name: "db_host",
                    default: "localhost",
                },
            ]);
        //create a .env based on the responses
        const wstream = createWriteStream(resolve(".env"));
        wstream.write(
            `
                             db_path=${GetRealPath(db_path)}/
                             project_path=${resolve(".//")}/
                             database=Anvw
                             project_port=${db_port}
                             db_user=${db_user}
                             db_pass=${db_pass}
                             db_host=${db_host}
                             `
                .trim()
                .replace("\t", "")
        );
        wstream.end();
        const connection = mysql.createConnection({
            host: db_host,
            password: db_pass,
            user: db_user,
        });
        //create the database
        connection.query("CREATE DATABASE IF NOT EXISTS Anvw", (err, result) => { });
        connection.destroy();
    }
})();
