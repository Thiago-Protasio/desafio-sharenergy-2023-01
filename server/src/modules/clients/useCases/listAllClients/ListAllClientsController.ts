import { Request, Response } from "express";

import { ListAllClientsUseCase } from "./ListAllClientsUseCase";

class ListAllClientsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page = 1 } = request.query;

    const listAllClientsUseCase = new ListAllClientsUseCase();

    const clients = await listAllClientsUseCase.execute(Number(page));

    return response.status(200).json(clients);
  }
}

export { ListAllClientsController };
