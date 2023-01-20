import { Request, Response } from "express";

import { ICreateClientDTO } from "../../dtos/ICreateClientDTO";
import { CreateClientUseCase } from "./CreateClientUseCase";

class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      phone,
      country,
      cep,
      city,
      state,
      street,
      address_number,
      cpf,
    }: ICreateClientDTO = request.body;

    const createClientUseCase = new CreateClientUseCase();

    const client = await createClientUseCase.execute({
      name,
      email,
      phone,
      country,
      cep,
      city,
      state,
      street,
      address_number,
      cpf,
    });

    return response.status(201).json(client);
  }
}

export { CreateClientController };
