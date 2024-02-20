import { Router } from "express";
const hotelRouter = Router();

import { checkAuth } from "../utils/auth";
import { hotelController } from "../controllers/hotelController";

import { checkEmpty } from "../utils/helper";

hotelRouter.post("/",
    checkAuth,
    checkEmpty(["name", "number"]),
    hotelController.create);

hotelRouter.get("/",
    checkAuth,
    hotelController.getAll);


hotelRouter.delete("/:id",
    checkAuth,
    hotelController.destroy);


export { hotelRouter };
