import { IUser, User } from "../../../models/User";
import { IUsersRepository } from "./IUsersRepsoitory";

class UsersRepository implements IUsersRepository {
  async findByUsername(username: string): Promise<IUser | null | undefined> {
    const user = await User.findOne({ username });

    return user;
  }
}

export { UsersRepository };
