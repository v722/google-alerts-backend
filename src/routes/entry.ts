import * as express from "express";
import { getEntries } from "../controller/entry";
export const entryRoute = express.Router();

entryRoute.get("/", getEntries);