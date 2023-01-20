import { Router } from "express";

import { AuthenticateUserController } from "../modules/users/useCases/authenticateUser/AuthenticateUserController";

const usersRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

usersRoutes.post("/auth", authenticateUserController.handle);

export { usersRoutes };
