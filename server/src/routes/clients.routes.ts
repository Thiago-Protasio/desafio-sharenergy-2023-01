import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateClientController } from "../modules/clients/useCases/createClient/CreateClientController";
import { DeleteClientController } from "../modules/clients/useCases/deleteClient/DeleteClientController";
import { ListAllClientsController } from "../modules/clients/useCases/listAllClients/ListAllClientsController";
import { UpdateClientController } from "../modules/clients/useCases/updateClient/UpdateClientController";

const clientsRoutes = Router();

const createClientController = new CreateClientController();
const updateClientController = new UpdateClientController();
const deleteClientController = new DeleteClientController();
const listAllClientsController = new ListAllClientsController();

clientsRoutes.post("/", ensureAuthenticated, createClientController.handle);

clientsRoutes.get("/", ensureAuthenticated, listAllClientsController.handle);

clientsRoutes.post(
  "/update/:id",
  ensureAuthenticated,
  updateClientController.handle
);

clientsRoutes.delete(
  "/delete/:id",
  ensureAuthenticated,
  deleteClientController.handle
);

export { clientsRoutes };
