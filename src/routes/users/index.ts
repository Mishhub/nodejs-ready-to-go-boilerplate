import * as express from "express";
import { Login } from "../../../app/";

const usersRouter = express.Router();

usersRouter.get("/login", Login);

module.exports = usersRouter;
