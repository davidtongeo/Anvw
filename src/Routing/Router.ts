import express from "express";
import TestServer from "./testing.files";
import GetFiles from "./Get.files";
import GetVideo from "./Get.play";
import Home from "./Get.home";
import { config } from "dotenv";
config();
const { project_path, project_port } = process.env;
const app = express();
app.use(express.static(project_path + "/src/frontend/"));
GetVideo(app);
GetFiles(app);
TestServer(app);
Home(app);

app.listen(project_port, () => {
    console.log("Server Running in port: " + project_port);
});
