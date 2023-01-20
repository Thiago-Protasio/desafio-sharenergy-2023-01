import { hash } from "bcrypt";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

import "express-async-errors";

import { User } from "./models/User";
import { routes } from "./routes";

const app = express();

app.use(express.json());

app.use(cors());

app.use(routes);

async function createDefaultUser() {
  const username = "desafiosharenergy";

  const defaultUser = await User.findOne({ username });

  if (!defaultUser) {
    const password = await hash("sh@r3n3rgy", 10);

    await User.create({
      username,
      password,
    });
  }
}

createDefaultUser();

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      response.status(400).json({
        message: err.message,
      });
    }
  }
);

export { app };
