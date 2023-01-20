import { Request, Response } from "express";

import { DeleteClientUseCase } from "./DeleteClientUseCase";

class DeleteClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteClientUseCase = new DeleteClientUseCase();

    await deleteClientUseCase.execute(id);

    return response.status(200).send();
  }
}

export { DeleteClientController };
