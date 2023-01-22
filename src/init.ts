import mysql from "mysql2";
import inquirer from "inquirer";

import { existsSync, createWriteStream } from "fs";
import { resolve } from "path";

function GetRealPath(filepath: string) {
    //this function will return the real extended path
    const OsHOME = require("os").homedir();
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

        //create database
        const connection = mysql.createConnection({
            host: db_host,
            user: db_user,
            password: db_pass,
        });
        //create the database
        connection.execute("CREATE DATABASE IF NOT EXISTS Anvw");
        connection.end();
    }
})();
