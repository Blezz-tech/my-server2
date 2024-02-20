import { Router } from "express";
import { db } from '../config';
import { Admins } from '../entity/Admins';
import { checkEmpty } from "../utils/helper";
import { adminController } from "../controllers/adminController";

const signupRouter = Router();

// Нужно сделать нормальную валидацию, НО КАК?!?!?!?
signupRouter.post("/",
    checkEmpty(["username", "password"]),
    async (req, res, next) => {
        const username = req.body.username;
        const isUserExist = await db.getRepository(Admins).exist({
            where: {
                "username": username
            }
        });
        if (isUserExist) {
            return res.status(401).json({
                "message": "The given data was invalid",
                "errors": {
                    "username": [
                        "this username is exist"
                    ]
                },
            });
        }
        next()
    },
    adminController.create
);

export { signupRouter };
