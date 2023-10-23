import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import config from "./config.js";
import express from "express";
import morganBody from "morgan-body";
import cors from "cors";
import { connect } from "./src/database/db.js";
import { router } from "./src/route/index.route.js";
import { basicAuthHelper } from "./src/helper/basic-auth.helper.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

morganBody(app, { maxBodyLength: 2000 });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

let connection;
try {
  connection = await connect();
} catch (error) {
  console.log(error);
}

process.on("SIGINT", async () => {
  await connection.close((err) => {
    if (err)
      console.log(
        `Error connecting to ${config.dbSid} database: ${err.message}.`
      );
  });
  console.log(`${config.dbSid} database has been disconnected.`);
  process.exit(0);
});

app.use((req, res, next) => {
  req.db = connection;
  next();
});

app.use("/delsol/api", basicAuthHelper, router);
app.use("*", function (req, res) {
  res.status(404).json({
    success: false,
    message: "Solicitud incorrecta.",
  });
});

app.listen(config.port, () => {
  console.log(
    `Server API-DELSOL running on port ${config.port} in mode ${process.env.NODE_ENV}`
  );
});
