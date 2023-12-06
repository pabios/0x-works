import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import route from "./routes/routes.js";

dotenv.config();
const { APP_HOSTNAME, APP_PORT, NODE_ENV } = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors({
    origin: [
        "http://localhost:4200"
    ], credentials: true
}));

app.use(express.json())

// Middleware pour traiter les données POST au format "x-www-form-urlencoded"
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


// ==========
// App routers
// ==========

app.use("/", route);

// ==========
// App start
// ==========

app.listen(APP_PORT, () => {
    console.log(`App listening at http://${ APP_HOSTNAME }:${ APP_PORT }`);
});
