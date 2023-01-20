import { Request, Response } from "express";

import { UpdateClientUseCase } from "./UpdateClientUseCase";

class UpdateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: clientId } = request.params;
    const data = request.body;

    const updateClientUseCase = new UpdateClientUseCase();

    const client = await updateClientUseCase.execute(clientId, data);

    return response.status(200).json(client);
  }
}

export { UpdateClientController };
