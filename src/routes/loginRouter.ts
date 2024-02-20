import { Router } from "express";
import { body } from "express-validator";

const loginRouter = Router();

import { checkEmpty } from "../utils/helper.js";
import { tokenController } from "../controllers/tokenController.js";

loginRouter.post("/",
    [
        body("username").notEmpty(),
        body("password").notEmpty()
    ],
    checkEmpty,
    tokenController.create);

export { loginRouter };
