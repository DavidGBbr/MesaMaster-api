import { hash } from "bcryptjs";
import prismaClient from "../../prisma";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    if (!name || !email || !password) {
      throw new Error("Data incorrect");
    }

    const userAlreadyExist = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (userAlreadyExist) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }
}
