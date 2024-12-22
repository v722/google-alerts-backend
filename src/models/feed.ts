import mongoose, { Schema } from "mongoose";
import { IFeed } from "../interface/index";
const feedModel = new Schema<IFeed>(
    {
        title: {
            type: String,
            required: true
        },
        feedUrl: {
            type: String,
            required: false
        },
        lastBuildDate: {
            type: Date,
            required: false
        },
        category_id: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, strict: false }
);

export const FeedModel = mongoose.model<IFeed>('feeds', feedModel);
