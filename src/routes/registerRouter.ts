import { Router } from "express";
const registerRouter = Router();

import { checkAuth } from "../utils/auth";
import { checkEmpty } from "../utils/helper";
import { clientController } from "../controllers/clientController";

registerRouter.post("/",
    checkAuth,
    checkEmpty(["fio", "email", "phone", "id_rooms", "birth_date"]),
    clientController.create);

export { registerRouter };
