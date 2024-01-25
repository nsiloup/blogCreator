import express, { Express, Request, Response } from "express";
import path from "node:path";
// import "./types-interfaces/globals.ts";
import articlesRouter from "./routes/articles.js";
import { Article } from "./types-interfaces/globals.js";
import sanitizedConfig from "./config.js";
import { fileURLToPath } from "node:url";
import config from "./config.js";
import mongoose from "mongoose"; 
import cors from "cors";
import rootRouter from "./routes/root.js";
import methodeOverride from "method-override";

// const { Express, /*Request, Response*/ } = require("express");
// const express = require("express");
// const path = require("path");
// const articlesRouter = require("./routes/articles");
// const { Article } = require("./types-interfaces/globals");
// const sanitizedConfig = require("./config");
// const { fileURLToPath } = require("node:url");
// const config =require("./config");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const rootRouter = require("./routes/root");



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app/*: Express*/ = express();

const connectToDb = async () =>{
    console.log("Connecting to Database, wait please...");

    try{
        const connection = await mongoose.connect(config.MONGO_URI);
        console.log(`🟢 MongoDb Connected: `, connection.connection.host);
    }catch(err) {
        console.log(err);
        throw err;
    }
}

// To be able to use the DELETE methods,
// because by default it's not permitted by default
app.use(methodeOverride("_method"));// in express

// setting up root path for views
// app.set("views", path.join(__dirname, "public/views"));
app.set("views", path.join(process.cwd(), "public/views"));

// // Setting up view engine
app.set("view engine", "ejs");


app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors())

// Express's Method to recognize the incoming
// data on Request Object as string or array
// app.use(express.urlencoded({extended: false})); 

// Express's Method to recognize the incoming 
// data on Request body as an json object;
app.use(express.json());


app.get("/", rootRouter);

app.use("/articles", articlesRouter)



app.listen(sanitizedConfig.PORT, () =>{
    console.log(`App is ruuuuunning at http://localhost:${sanitizedConfig.PORT}`/**/);
    connectToDb();
})
