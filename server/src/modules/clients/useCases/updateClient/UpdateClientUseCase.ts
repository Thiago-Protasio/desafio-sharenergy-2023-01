import mongoose from "mongoose";

import { ICreateClientDTO } from "../../dtos/ICreateClientDTO";
import { ClientsRepository } from "../../repositories/ClientsRepository";

class UpdateClientUseCase {
  async execute(clientId: string, data: ICreateClientDTO) {
    const clientsRepository = new ClientsRepository();

    const isValid = mongoose.isValidObjectId(clientId);

    if (!isValid) {
      throw new Error("Client not found!");
    }

    const client = await clientsRepository.updateClient(clientId, data);

    if (!client) {
      throw new Error("Client not found!");
    }

    return client;
  }
}

export { UpdateClientUseCase };
