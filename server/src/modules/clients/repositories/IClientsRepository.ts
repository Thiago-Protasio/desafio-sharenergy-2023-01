import { IClient } from "../../../models/Client";
import { ICreateClientDTO } from "../dtos/ICreateClientDTO";

export interface IListClientsResponse {
  clients: IClient[];
  totalPages: number;
}

interface IClientsRepository {
  createClient(data: ICreateClientDTO): Promise<IClient>;
  findClientByCpf(cpf: number): Promise<IClient | null>;
  updateClient(id: string, data: ICreateClientDTO): Promise<IClient | null>;
  deleteClient(id: string): Promise<void>;
  findClientById(id: string): Promise<IClient | null>;
  listAllClients(page: number): Promise<IListClientsResponse>;
}

export { IClientsRepository };
