import { Router } from "express";
const usersinroomRouter = Router();

import { checkAuth } from "../utils/auth";
import { clientController } from "../controllers/clientController";

usersinroomRouter.get("/",
    checkAuth,
    clientController.showInRooms);

export { usersinroomRouter };
