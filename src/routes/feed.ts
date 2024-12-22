import * as express from "express";
import { createFeed, getFeeds } from "../controller/feed";
export const feedRoute = express.Router();

feedRoute.post("/", createFeed);

feedRoute.get("/", getFeeds);