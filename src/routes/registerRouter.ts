import { Router } from "express";
const registerRouter = Router();

import { checkAuth } from "../utils/auth";
import { checkEmpty } from "../utils/helper";
import { body } from "express-validator";
import { clientController } from "../controllers/clientController";

registerRouter.post("/",
    checkAuth,
    [
        body("fio").notEmpty(),
        body("email").notEmpty(),
        body("phone").notEmpty(),
        body("id_rooms").notEmpty(),
        body("birth_date").notEmpty()
    ],
    checkEmpty,
    clientController.create);

export { registerRouter };
