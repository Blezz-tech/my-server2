import { Request, Response } from 'express';
import { db } from '../config';
import { Clients } from '../entity/Clients';

class ClientController {
  async create(req: Request, res: Response) {
    const { fio, email, phone, id_rooms, birth_date } = req.body;
    const clients_settings = {
      "fio": fio,
      "email": email,
      "phone": phone,
      "birth_date": birth_date
    };


    for (const [key, value] of Object.entries(clients_settings)) {
      console.log(`${key}: ${value}`);
      const checking = {};
      checking[`${key}`] = value;

      const isExist = await db.getRepository(Clients).exist({
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

    clients_settings["id_rooms"] = id_rooms;

    const new_client = await db.getRepository(Clients).create(clients_settings)
    const results = await db.getRepository(Clients).save(new_client)


    res.status(200).send({
      data: {
        message: "Created",
      },
    });

  }

  async destroy(req: Request, res: Response) {
    const id: any = req.params.id;

    const isClientExist = await db.getRepository(Clients).exist({
      where: {
        "id": id
      }
    });

    if (!isClientExist) {
      return res.status(403).json({
        "error": {
          "message": "Not found"
        }
      });
    }

    const result = await db.getRepository(Clients).delete(id);

    res.send({
      "data": {
        "message": "Deleted"
      }
    });
  }

  async update(req: Request, res: Response) {
    const id: any = req.params.id;

    const isClientExist = await db.getRepository(Clients).exist({
      where: {
        "id": id
      }
    });

    if (!isClientExist) {
      return res.status(403).json({
        "error": {
          "message": "Not found"
        }
      });
    }

    const { fio, email, phone, id_rooms, birth_date } = req.body;
    const clients_settings = {
      "id_rooms": id_rooms,
      "fio": fio,
      "email": email,
      "phone": phone,
      "birth_date": birth_date
    };

    Object.keys(clients_settings).forEach(key =>
      clients_settings[key] === undefined
        ? delete clients_settings[key]
        : {});

    const property = await db.getRepository(Clients).findOne({
      where: { id }
    });

    const result = await db.getRepository(Clients).save({
      ...property, // existing fields
      ...clients_settings // updated fields
    });

    res.status(200).send({
      "data": {
        "id": id,
        "message": "Updated"
      }
    });
  }

  async showInRooms(req: Request, res: Response) {

    const results = await db.getRepository(Clients).find();

    const process_results = results.map(item => ({
      fio: item.fio,
      phonenumber: item.phone
    }));

    console.log(results);
    res.status(200).send({
      data: {
        name: "Название",
        userdata: process_results
      },
    });
  }
}

export const clientController = new ClientController();