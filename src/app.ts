require("dotenv").config();
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import config from "config";
import connectToMongoDB from "./utils/db";
import log from "./utils/logger";
import router from "./routes/index";
import { deserializeUser } from "./middleware/deserializeUser";

const app = express();

app.use(
    cors({
        credentials: true,
    })
);

app.use(compression());
app.use(cookieParser());
app.use(deserializeUser);
app.use(bodyParser.json());

app.use(router);

const port = config.get<number>("port");
const server = http.createServer(app);

server.listen(port, () => {
    log.info(`Server started on port http://localhost:${port}`);
    connectToMongoDB();
});
