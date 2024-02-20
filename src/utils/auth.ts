import { NextFunction, Request, Response } from "express";
import { Tokens } from "../entity/Tokens";
import { db } from "../config";
import { tokenController } from "../controllers/tokenController";

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    const output = {
        "message": "Unauthorized",
        "errors": {
            "token": "invalid credentials"
        }
    };

    if (req.headers.authorization == undefined) {
        return res.status(402).send(output);
    }

    const token: any = req.headers.authorization.slice(7);

    const isTokenExist = await tokenController.isExist(token);
    
    if (!isTokenExist) {
        return res.status(402).send(output);
    }

    next();
};

export { checkAuth }