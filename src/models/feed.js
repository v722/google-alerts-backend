"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedModel = void 0;
const mongoose_1 = require("mongoose");
const feedModel = new mongoose_1.Schema({
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
    keyword: {
        type: String,
        required: true
    },
    category_id: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, strict: false });
exports.FeedModel = mongoose_1.default.model('feeds', feedModel);
