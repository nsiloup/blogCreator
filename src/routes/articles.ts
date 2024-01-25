import express, { Router } from "express";
import { 
    articleModel_create_post,
    articleModel_get_slug, reader_get_articles,
    articleModel_delete_post,
    articleModel_edit_articles,
    articleModel_put_article
} from "../middlewares/articleMiddlewares.js";
// import { articleModel_create_post, articleModel_get_slug, reader_get_articles } from "../middlewares/articleMiddlewares";
// import validateForm from "../helpers/validateForm.ts";
// import validateForm from "../helpers/validateForm";

const articlesRouter: Router = express.Router();



articlesRouter.post("/", articleModel_create_post, );

articlesRouter.put("/:id", articleModel_put_article);

articlesRouter.get("/createArt", reader_get_articles);

articlesRouter.get("/editArt/:id", articleModel_edit_articles);


articlesRouter.delete("/:id", articleModel_delete_post)


// This endpoint shows the id of the article in the url
articlesRouter.get("/:slug", articleModel_get_slug);



export default articlesRouter;

