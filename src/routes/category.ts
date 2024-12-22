import * as express from "express";
import { getCategories } from "../controller/category";
export const categoryRoute = express.Router();

categoryRoute.get("/", getCategories);