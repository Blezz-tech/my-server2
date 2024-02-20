import { Router } from "express";
const userdataRouter = Router();

import { checkAuth } from "../utils/auth";
import { clientController } from "../controllers/clientController";


userdataRouter.patch("/:id",
    checkAuth,
    clientController.update);
    
userdataRouter.delete("/:id",
    clientController.destroy);

export { userdataRouter };

