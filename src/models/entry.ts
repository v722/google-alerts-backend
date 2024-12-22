import mongoose, { Schema } from "mongoose";
import { IEntry } from "../interface/index";
const entryModel = new Schema<IEntry>(
    {
        title: {
            type: String,
            required: true
        },
        id: {
            type: String,
            unique: true,
            required: true
        },
        author: {
            type: String,
            required: false, 
        },
        contentSnippet: {
            type: String,
            required: false,
        },
        comments: {
            type: String,
            required: false
        },
        pubDate: {
            type: Date,
            required: false
        },
        updated_at: {
            type: Date,
            required: false
        },
        content: {
            type: String,
            required: false
        },
        link: {
            type: String,
            required: false
        },
        feed_id: {
            type: String,
            required: true
        }
    },
    { timestamps: { createdAt: "created_at" }, strict: false }
);

export const EntryModel = mongoose.model<IEntry>('entries', entryModel);
