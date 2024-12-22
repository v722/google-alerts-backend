import * as express from "express";
import { feedRoute } from "./feed";
import { entryRoute } from "./entry";
import { categoryRoute } from "./category";

export const router = express.Router();

router.use("/feed", feedRoute);

router.use("/entry", entryRoute);

router.use("/category", categoryRoute);