import { Client, IClient } from "../../../models/Client";
import { ICreateClientDTO } from "../dtos/ICreateClientDTO";
import { IClientsRepository, IListClientsResponse } from "./IClientsRepository";

class ClientsRepository implements IClientsRepository {
  // Create Client
  async createClient({
    name,
    email,
    phone,
    country,
    city,
    state,
    address_number,
    street,
    cep,
    cpf,
  }: ICreateClientDTO): Promise<IClient> {
    const client = await Client.create({
      name,
      email,
      phone,
      country,
      city,
      state,
      address_number,
      street,
      cep,
      cpf,
    });

    return client;
  }

  // Update Client
  async updateClient(
    id: string,
    {
      name,
      email,
      phone,
      country,
      city,
      state,
      address_number,
      street,
      cep,
      cpf,
    }: ICreateClientDTO
  ): Promise<IClient | null> {
    const client = await Client.findOneAndUpdate(
      { _id: id },
      {
        name,
        email,
        phone,
        country,
        city,
        state,
        address_number,
        street,
        cep,
        cpf,
      },
      { new: true }
    );

    return client;
  }

  async findClientByCpf(cpf: number): Promise<IClient | null> {
    const client = await Client.findOne({ cpf });

    return client;
  }

  async findClientById(id: string): Promise<IClient | null> {
    const client = await Client.findOne({ _id: id });

    return client;
  }

  async listAllClients(page: number): Promise<IListClientsResponse> {
    const limit = 10;

    const clients = await Client.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ created_at: "desc" })
      .exec();

    const count = await Client.countDocuments();
    const totalPages = Math.ceil(count / limit);

    return {
      clients,
      totalPages,
    };
  }

  async deleteClient(id: string): Promise<void> {
    await Client.findByIdAndDelete({ _id: id });
  }
}

export { ClientsRepository };
