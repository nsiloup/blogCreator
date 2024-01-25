// File for my configuration of 
// used things

import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

export  const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

// parsing the env file
// dotenv.config({path: path.resolve(__dirname, "../utils/config.env")});
dotenv.config({path: path.resolve(__dirname, "../config.env")});

interface ENV {
    NODE_ENV: string | undefined;
    PORT: number | undefined;
    MONGO_URI: string | undefined;
}

interface Config {
    NODE_ENV: string ;
    PORT: number;
    MONGO_URI: string;
};

// Loading process.env as ENV interface

const getConfig = (): ENV =>{
    return {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
        MONGO_URI: process.env.MONGO_URI,

    }
};


// Throwing an Error if any field was undefined we don't 
// want our app to run if it can't connect to DB and ensure 
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type 
// definition.

const getSanitizedConfig = (config: ENV): Config =>{
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined ) {
            throw new Error(`Missing Key ${key} in config.env`);
        }
    }
    return config as Config;
};

const config =  getConfig();

const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;