import * as dotenv from 'dotenv';
import express from 'express';
import cors from "cors";

import { authorRouter } from "./author/author.router";

dotenv.config();

if (!process.env.SERVER_PORT) {
    process.exit(1);
}

const SERVER_PORT = parseInt(process.env.SERVER_PORT, 10);

const app = express();

app.use(cors());
app.use(express.json());

app.use("api/authors", authorRouter);

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`);
})





