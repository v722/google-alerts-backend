import { Request, Response } from "express";
import { EntryModel } from "../models/entry";
import { formatErrorMessage, formatSuccessMessage } from "../common/handleResponse";
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE_NUMBER } from "../constants";

export const getEntries = [
    async (req: Request, res: Response) => {
        try {
            const { feed_id } = req.query;
            const limit = req.query.limit ? Number(req.query.limit) : DEFAULT_ITEMS_PER_PAGE,
                page = req.query.page ? Number(req.query.page) : DEFAULT_PAGE_NUMBER;
            const totalCount = await EntryModel.count({ feed_id });
            const items = await EntryModel.find({ feed_id  }).skip((limit * page) - limit).limit(limit);
            return res.status(200).json(formatSuccessMessage({
                totalCount,
                items,
                page,
            }));
        } catch (error) {
            console.log("Get Feed: failed", error);
            return res.status(error?.status || 400).json(formatErrorMessage(error));
        }
    }
];