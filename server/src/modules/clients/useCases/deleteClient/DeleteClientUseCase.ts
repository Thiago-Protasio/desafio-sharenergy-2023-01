import mongoose from "mongoose";

import { ClientsRepository } from "../../repositories/ClientsRepository";

class DeleteClientUseCase {
  async execute(id: string): Promise<void> {
    const clientsRepository = new ClientsRepository();

    const isValid = mongoose.isValidObjectId(id);

    if (!isValid) {
      throw new Error("Client not found!");
    }

    const client = await clientsRepository.findClientById(id);

    if (!client) {
      throw new Error("Client not found!");
    }

    await clientsRepository.deleteClient(id);
  }
}

export { DeleteClientUseCase };
