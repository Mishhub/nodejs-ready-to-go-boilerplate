"use strict";

import * as express from "express";
import * as path from "path";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
const env = process.env.NODE_ENV || "development";
const config = require(`./config/env/${env}`).config;

//routes
const Router: typeof express.Router = require("./routes");
import { mkdirSync, existsSync } from "fs";

const app = express();

if (config.env === "development") {
  mongoose.set("debug", true);
}
const connect = function () {
  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: true,
  };
  mongoose.connect(config.db, options);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
  });
};
connect();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// express middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("trust proxy", true);
// cors
app.use((req, res, next) => {
  var origin = req.headers.origin;
  console.log("origin>>>>", origin);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,X-Auth-Token, Accept, Authorization, Access-Control-Allow-Credentials"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");

  next();
});
app.use(function (req, res, next) {
  console.log("Your request here:");
  console.log(req.body); // populated!
  next();
});

// const router: express.Router = express.Router();
// app.use("/", routes);
app.use("/api/v1/", Router);

export default app;
