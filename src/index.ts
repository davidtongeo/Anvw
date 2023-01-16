//imports
import { Auth } from "./db/auth";
import { config } from "dotenv";
//auth
Auth();
//routing
require("./Routing/Router");
