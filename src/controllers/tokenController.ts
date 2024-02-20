import { Request, Response } from 'express'
import { Admins } from "../entity/Admins"
import { db } from "../config"
import { createJWT } from "../utils/jwt";
import { Tokens } from '../entity/Tokens';
import { adminController } from './adminController';

class TokenController {
  async create(req: Request, res: Response) {
    const { username, password } = req.body;

    const isUserExist = await adminController.isExist(username, password);

    if (!isUserExist) {
      return res.status(401).send({
        message: "Unauthorized",
        errors: {
          login: "invalid credentials"
        },
      });
    }
    const jwt_token = createJWT();

    const { id } = await adminController.getId(username, password);

    const new_token = db.getRepository(Tokens).create({
      admins_id: id,
      token: jwt_token
    });

    const results = await db.getRepository(Tokens).save(new_token);

    return res.status(200).send({
      "data": {
        "token_user": jwt_token,
      },
    });
  }
}


export const tokenController = new TokenController();