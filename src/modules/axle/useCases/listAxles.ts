import { Injectable } from "@nestjs/common";
import { AxleRepository } from "../repositories/axleRepository";

@Injectable()
export class ListAxles {
  constructor(private readonly axleRepository: AxleRepository) { }

  async execute() {
    return await this.axleRepository.list()
  }
}