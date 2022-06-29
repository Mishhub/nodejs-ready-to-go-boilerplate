import * as express from "express";
const Router = express.Router();
const usersRouter: typeof express.Router = require("./users");

Router.use("/", usersRouter);

module.exports = Router;
