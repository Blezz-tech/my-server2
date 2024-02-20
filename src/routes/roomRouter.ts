import { Router } from "express";
const roomRouter = Router();

import { roomController } from "../controllers/roomController";
import { checkEmpty } from "../utils/helper";
import { checkAuth } from "../utils/auth";

roomRouter.post("/",
    checkAuth,
    checkEmpty(["name", "desc_data"]),
    roomController.create);
roomRouter.delete("/:id",
    checkAuth,
    roomController.destroy);

export { roomRouter };
