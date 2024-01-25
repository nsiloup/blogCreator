import mongoose, { Schema } from "mongoose";
import { marked } from "marked";
import mySlugify from "../utils/slugify.js";
// import mySlugify from "../../utils/slugify";
import createDomPurifier from "dompurify";
import { JSDOM } from "jsdom";
const dompurify = createDomPurifier(new JSDOM().window);


const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
});

// to Automatically calculate how to do the
// slug part, so we don't have to do it over
// and over when we create ne articles,
// We're going to use the .prevalidate

articleSchema.pre("validate", async function(next){
    // This function is gona prevalidate
    // any time we make any operation 
    // Update, create, delete,...

    if(this.title) {
        this.slug = mySlugify(this.title)
    }

    // if(this.markdown) {
    //     this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown));
    // }

    if (this.markdown) {
        // Assuming marked.parse returns a Promise<string>
        const parsedMarkdown = await marked.parse(this.markdown);
        
        // Ensure the result is a string
        if (typeof parsedMarkdown === 'string') {
            this.sanitizedHtml = dompurify.sanitize(parsedMarkdown);
        } else {
            // Handle the case where marked.parse doesn't return a string
            console.error("marked.parse did not return a string");
        }
    }

    next();
})

export const ArticleModel = mongoose.model("ArticleModel", articleSchema);
