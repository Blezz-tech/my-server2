import { Router } from "express";
const roomsRouter = Router();

import { checkAuth } from "../utils/auth";
import { roomController } from "../controllers/roomController";

roomsRouter.get("/",
    checkAuth,
    roomController.getAll);

export { roomsRouter };
