import express from "express";
import { articleModel_get_all } from "../middlewares/rootMiddleware.js"
// import { articleModel_get_all } from "../middlewares/rootMiddlewares"

const rootRouter = express.Router();

export default rootRouter.get("/", articleModel_get_all);