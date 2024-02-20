import { Request, Response } from 'express'
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

  isExist(token: any) {
    const isExist = 
      db.getRepository(Tokens)
        .exist({ where: { "token": token } });
    return isExist;
  }
}


export const tokenController = new TokenController();