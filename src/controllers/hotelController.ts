import { db } from "../config.js";
import { Hotels } from "../entity/Hotels.js";
import { Request, Response } from 'express';

class HotelController {
  async create(req: Request, res: Response) {
    const { name, number } = req.body;
    const hotel_settings = {
      "name": name,
      "number": number,
    };


    for (const [key, value] of Object.entries(hotel_settings)) {
      console.log(`${key}: ${value}`);
      const checking = {};
      checking[`${key}`] = value;

      const isExist = await db.getRepository(Hotels).exist({
        where: checking
      });

      if (isExist) {
        checking[`${key}`] = [value];

        return res.status(401).json({
          "message": "The given data was invalid",
          "errors": checking,
        });
      }
    }



    const new_hotel = await db.getRepository(Hotels).create({ name, number })
    const results = await db.getRepository(Hotels).save(new_hotel);


    res.status(200).send({
      data: {
        id: results.id,
        name: name,
        number: number
      },
    });
  }

  async getAll(req: Request, res: Response) {

    const results = await db.getRepository(Hotels).find();
    const processd_result = results.map(item => ({
      name: item.name,
      number: item.number
    }));

    res.status(200).send({
      list: processd_result,
    });
  }

  async destroy(req: Request, res: Response) {
    const id: any = req.params.id;

    const isHotelExist = await db.getRepository(Hotels).exist({
      where: {
        "id": id
      }
    });

    if (!isHotelExist) {
      return res.status(403).json({
        "error": {
          "message": "Not found"
        }
      });
    }

    const result = await db.getRepository(Hotels).delete(id);

    res.send({
      "data": {
        "message": "Deleted"
      }
    });

  }
}

export const hotelController = new HotelController();
