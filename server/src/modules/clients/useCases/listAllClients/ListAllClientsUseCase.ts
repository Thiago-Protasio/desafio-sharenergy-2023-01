import { ClientsRepository } from "../../repositories/ClientsRepository";
import { IListClientsResponse } from "../../repositories/IClientsRepository";

class ListAllClientsUseCase {
  async execute(page: number): Promise<IListClientsResponse> {
    const clientsRepository = new ClientsRepository();

    const clients = await clientsRepository.listAllClients(page);

    if (page > clients.totalPages) {
      throw new Error("Invalid page!");
    }

    return clients;
  }
}

export { ListAllClientsUseCase };
