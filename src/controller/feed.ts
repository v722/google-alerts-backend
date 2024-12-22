import { Request, Response } from "express";
import { formatErrorMessage, formatSuccessMessage } from "../common/handleResponse";
import { IFeed } from "../interface";
import { CategoryModel } from "../models/category";
import { FeedModel } from "../models/feed";
import { EntryModel } from "../models/entry";
import { AppError, ErrorCode } from "../constants/appCode";
import * as Parser from "rss-parser";
import { DEFAULT_ITEMS_PER_PAGE } from "../constants";
let parser = new Parser();

export const createFeed = [
    async (req: Request, res: Response) => {
        try {
            const { category_name, url, keyword } = req.body;
            const data = await parser.parseURL(url);
            const feedsExist = await FeedModel.findOne({ feedUrl: data?.feedUrl });
            if (feedsExist) {
                throw { msg: AppError.FEED_ALREADY_EXIST, status: ErrorCode.NOT_FOUND }
            }
            const categoryData = await CategoryModel.findOne({ name: category_name });
            let category_id = categoryData?._id?.toString();
            if (!categoryData) {
                const category = new CategoryModel({ name: category_name });
                const res = await category.save();
                category_id = res._id?.toString();
            }
            const feedPayload: IFeed = {
                category_id: category_id,
                lastBuildDate: data?.lastBuildDate,
                link: data?.link,
                feedUrl: data?.feedUrl,
                keyword,
                title: data?.title,
                updated_at: data?.updated,
            }
            const feed = new FeedModel(feedPayload);
            const feedData = await feed.save();

            const entries: any[] = [];
            for (const entry of data.items) {
                const bulkWrite = {
                    updateOne: {
                        filter: { title: entry?.title },
                        update: {
                            $set: {
                                id: entry?.id,
                                link: entry?.link,
                                title: entry?.title,
                                content: entry?.content,
                                pubDate: entry?.pubDate,
                                comments: entry?.comments,
                                created_at: new Date(),
                                feed_id: feedData?._id?.toString(),
                                author: entry?.author,
                                contentSnippet: entry?.contentSnippet,
                            }
                        },
                        upsert: true
                    },
                }
                entries.push(bulkWrite);
            }
            await EntryModel.bulkWrite(entries);
            return res.status(200).json(formatSuccessMessage());
        } catch (error) {
            console.log("Create Feed: failed", error);
            return res.status(error?.status || 400).json(formatErrorMessage(error));
        }
    }
];

export const getFeeds = [
    async (req: Request, res: Response) => {
        try {
            const { search, category_id } = req.query;
            let whereCondition = {};
            if (search) {
                whereCondition = { $or: [{ title: { $regex: search, $options: "i" } }]}
            }
            if (category_id !== "null") {
                whereCondition = {
                    ...whereCondition,
                    category_id
                }
            }
            const items = await FeedModel.find(whereCondition).sort({ created_at: -1 }).limit(DEFAULT_ITEMS_PER_PAGE);
            return res.status(200).json(formatSuccessMessage({ items }));
        } catch (error) {
            console.log("Get Feed: failed", error);
            return res.status(error?.status || 400).json(formatErrorMessage(error));
        }
    }
];