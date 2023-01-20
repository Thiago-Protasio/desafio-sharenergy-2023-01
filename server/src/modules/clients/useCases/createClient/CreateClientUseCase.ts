import { IClient } from "../../../../models/Client";
import { ICreateClientDTO } from "../../dtos/ICreateClientDTO";
import { ClientsRepository } from "../../repositories/ClientsRepository";

class CreateClientUseCase {
  async execute({
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
  }: ICreateClientDTO): Promise<IClient> {
    const clientsRepository = new ClientsRepository();

    const clientExists = await clientsRepository.findClientByCpf(cpf);

    if (clientExists) {
      throw new Error("Client already exists!");
    }

    const client = await clientsRepository.createClient({
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

    return client;
  }
}

export { CreateClientUseCase };
