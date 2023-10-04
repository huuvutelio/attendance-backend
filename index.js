import cors from "cors";
import "dotenv/config.js";
import express from "express";

import apiRouter from "./api/index.js";
import config from "./config.js";
import "./database/index.js";
import exceptionHandler from "./middlewares/exceptionHandler.js";
import "./redis/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.use(exceptionHandler);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
