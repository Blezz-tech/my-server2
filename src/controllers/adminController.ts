import { Request, Response } from 'express';
import { db } from '../config';
import { Admins } from '../entity/Admins';

class AdminController {
  async create(req: Request, res: Response) {
    const { username, password } = req.body;

    const new_user = await db.getRepository(Admins).create({ username, password })
    const results = await db.getRepository(Admins).save(new_user)

    res.status(200).send({
      data: {
        message: "Administrator created",
      },
    });
  }

}

export const adminController = new AdminController();