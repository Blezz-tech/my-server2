import { Router } from "express";

const loginRouter = Router();

import { checkEmpty } from "../utils/helper.js";
import { tokenController } from "../controllers/tokenController.js";

loginRouter.post("/",
    checkEmpty(["username", "password"]),
    tokenController.create);

export { loginRouter };
