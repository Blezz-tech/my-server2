import { Request, Response } from 'express';
import { db } from '../config';
import { Rooms } from '../entity/Rooms';

class RoomController {
  async create(req: Request, res: Response) {
    const { name, desc_data } = req.body;

    const new_room = db.getRepository(Rooms).create({
      "name": name,
      "desc_data": desc_data
    });
    const results = await db.getRepository(Rooms).save(new_room);

    res.status(200).send({
      data: {
        message: "Created",
      },
    });
  }

  async destroy(req: Request, res: Response) {
    const id: any = req.params.id;

    const isRoomExist = await this.isExist(id);

    if (!isRoomExist) {
      return res.status(403).json({
        "error": {
          "message": "Not found"
        }
      });
    }

    const result = await db.getRepository(Rooms).delete(id);

    res.send({
      "data": {
        "message": "Deleted"
      }
    });
  }

  async isExist(id: any) {
    const isExist = await
      db.getRepository(Rooms)
        .exist({ where: { "id": id } });
    return isExist;
  }

  async getAll(req: Request, res: Response) {

    const list_rooms = await db.getRepository(Rooms).find({
      select: ["name", "desc_data"]
    });

    res.setHeader("content-type", "application/json");
    res.status(200).send({
      "data": {
        "list": list_rooms
      },
    });
  }
}

export const roomController = new RoomController();
