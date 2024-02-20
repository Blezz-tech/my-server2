import { NextFunction, Request, Response } from "express";

const checkEmpty = (records: any) => 
    (req: Request, res: Response, next: NextFunction) => {
        const output = {
            "message": "The given data was invalid.",
            "errors": {}
        };
        let isError = false;

        records.forEach(record => {
            if (!req.body.hasOwnProperty(record)) {
                output.errors[record] = [`The ${record} field is required.`];
                isError = true;
            }
        });

        if (isError) {
            return res.status(401).send(output);
        }
        next();
    };


export { checkEmpty }