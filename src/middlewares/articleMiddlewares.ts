import { Request, Response, NextFunction } from "express";
import { ArticleModel } from "../models/article.js";
import { Article } from "../types-interfaces/globals.js";
// import { saveArticleAndRedirect } from "../helpers/forMiddlewares.js";
// import { ArticleModel } from "../models/article";
// import { Article } from "../types-interfaces/globals";
import methodeOverride from "method-override"


export function reader_get_articles (req: Request, res: Response, next: NextFunction) : void {
    try{
        res.render('articles/createArt', {article: new ArticleModel()});
    }catch(err){
        console.log(err);
        next(err)
    }
};



export async function articleModel_edit_articles(req: Request, res: Response, next: NextFunction) : Promise<void> {
    try{
        const article =  await ArticleModel.findById(req.params.id);
        res.render('articles/editArt', {article: article});
    }catch(err){
        console.log(err);
        next(err)
    }
};

export async function articleModel_get_slug(req: Request, res: Response, next: NextFunction) : Promise<void> {
    try{
        const userInput: null | Article = await ArticleModel.findOne({slug: req.params.slug});
        // console.log(`The req.params is`, req.params);

        if(userInput === null )
            {res.redirect("/");
        } else if(userInput){
            console.log(userInput)
            res.render("articles/showArt.ejs", {article: userInput});
        } else {
            res.send("Wrong title!");
            console.log("wrong title,instead got: ", userInput)
        }
    }catch(e) {
        throw e
    }
}

export async function articleModel_create_post(req: Request, res: Response, next: NextFunction) : Promise<void> {
    // req = new ArticleModel()
    let article = new ArticleModel({

        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });
    let savedArticle: Article | unknown;

    try{
        savedArticle =  await article.save();

        if(savedArticle &&  savedArticle instanceof ArticleModel){
            article = savedArticle
            res.redirect(`/articles/${article.slug}`);
        } else {
            // console.log("Bad information filled")
            res.redirect("article/createArt");
        }
    }catch(err){
        console.log(err);
        res.render(`article/createArt`, {article: article});
        next(err);
    }
};

export async function articleModel_put_article (req: Request, res: Response, next: NextFunction) : Promise<void> {

    let article = new ArticleModel({

        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });
    let savedArticle: Article | unknown;
    
    let foundArticle: Article | unknown;

    try{
        foundArticle =  await ArticleModel.findById(req.params.id);
        savedArticle = await article.save()


        if(savedArticle &&  savedArticle instanceof ArticleModel){
            // article = foundArticle

            res.redirect(`/articles/${savedArticle.slug}`);
        } else {
            // console.log("Bad information filled")
            res.redirect("article/editArt");
        } 
    }catch(err){
        res.render(`article/editArt`, {article: foundArticle});
        next(err);
    }
};


export async function articleModel_delete_post(req: Request, res: Response, next: NextFunction) : Promise<void> {
    let deleted: Article | unknown;
    try{
        deleted = await ArticleModel.findByIdAndDelete(req.params.id);

        if(deleted && deleted instanceof ArticleModel) {
            console.log("deleted: ", deleted);
            res.redirect("/");
        }else{
            next()
        }
    }catch(err){
        console.log(err);
        next(err);
    }
}

