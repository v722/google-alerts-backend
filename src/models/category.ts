import mongoose, { Schema } from "mongoose";
import { ICategories } from "../interface/index";
const categoryModel = new Schema<ICategories>(
    {
        name: {
            type: String,
            required: true
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, strict: false }
);

export const CategoryModel = mongoose.model<ICategories>('categories', categoryModel);
