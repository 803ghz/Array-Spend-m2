import { text } from "express";
import sanitizeHtml from "sanitize-html";

export const cleanInput = (text) => { 
    return sanitizeHtml(text, {
        allowedTags: [],
        allowedAttributes: {},
    })
}