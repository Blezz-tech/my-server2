import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const fastNotEmpty = (record: string) => body(record).notEmpty().withMessage(`The ${record} field is required.`);

const checkEmpty =
    (req: Request, res: Response, next: NextFunction) => {
        const output = {
            "message": "The given data was invalid.",
            "errors": {}
        };

        const result = validationResult(req);
        if (!result.isEmpty()) {
            result.array().forEach((item) => {
                output.errors[item["path"]] = [`The ${item["path"]} field is required.`];
            });
            return res.status(401).send(output);
        }
        next()
    };


export { fastNotEmpty, checkEmpty }