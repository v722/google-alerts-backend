"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntryModel = void 0;
const mongoose_1 = require("mongoose");
const entryModel = new mongoose_1.Schema({
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
}, { timestamps: { createdAt: "created_at" }, strict: false });
exports.EntryModel = mongoose_1.default.model('entries', entryModel);
