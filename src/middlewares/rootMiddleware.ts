import { Request, Response, NextFunction } from "express";
import { ArticleModel } from "../models/article.js";
// import { ArticleModel } from "../models/article";


export async function articleModel_get_all(req: Request, res: Response, next: NextFunction): Promise<void> {
    try{
        const articles = await ArticleModel.find().sort({createdAt: "desc"});
        res.render("articles/index.ejs", {articles: articles});
    }catch(e) {
        throw e;
    }
};