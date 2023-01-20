import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { UsersRepository } from "../../repositories/UsersRepository";

interface IAuthData {
  username: string;
  password: string;
  remember: boolean;
}

class AuthenticateUserUseCase {
  async execute({ username, password, remember }: IAuthData) {
    if (!username || !password) {
      throw new Error("Username or password invalid!");
    }

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findByUsername(username);

    if (!user) {
      throw new Error("Username or password invalid!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Username or password invalid!");
    }

    const token = sign({ username }, "challenge", {
      subject: user.username,
      expiresIn: remember ? "30d" : "1h",
    });

    return token;
  }
}

export { AuthenticateUserUseCase };
