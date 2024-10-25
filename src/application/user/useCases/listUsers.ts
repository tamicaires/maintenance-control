import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../../core/domain/repositories/user-repository";

@Injectable()
export class ListUsers {
  constructor(private readonly userRepository: UserRepository) { }

  async execute() {
    return await this.userRepository.list();
  }
}