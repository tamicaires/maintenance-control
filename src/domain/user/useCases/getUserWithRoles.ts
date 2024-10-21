import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/UserRepository";
import { UserNotFoundException } from "../exceptions/UserNotFountException";

@Injectable()
export class GetUserWithRoles {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(userId: string) {
    const user = await this.userRepository.findUserWithRole(userId);
    if (!user) throw new UserNotFoundException();
    return user;
  }
}