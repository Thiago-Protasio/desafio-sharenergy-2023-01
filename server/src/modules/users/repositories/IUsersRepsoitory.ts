import { IUser } from "../../../models/User";

interface IUsersRepository {
  findByUsername(username: string): Promise<IUser | null | undefined>;
}

export { IUsersRepository };
