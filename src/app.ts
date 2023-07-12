require('dotenv').config();
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import config from 'config';
import connectToMongoDB from './utils/db';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const port = config.get<number>('port');
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}`);

    connectToMongoDB();
});