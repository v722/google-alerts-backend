import { Request, Response } from "express";
import { formatErrorMessage, formatSuccessMessage } from "../common/handleResponse";
import { CategoryModel } from "../models/category";

export const getCategories = [
    async (req: Request, res: Response) => {
        try {
            const items = await CategoryModel.find();
            return res.status(200).json(formatSuccessMessage({ items }));
        } catch (error) {
            console.log("Get Feed: failed", error);
            return res.status(error?.status || 400).json(formatErrorMessage(error));
        }
    }
];