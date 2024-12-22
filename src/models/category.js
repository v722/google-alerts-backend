"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
const categoryModel = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, strict: false });
exports.CategoryModel = mongoose_1.default.model('categories', categoryModel);
