import { Injectable } from "@nestjs/common";
import { AxleRepository } from "../../../core/domain/repositories/axle-repository";

@Injectable()
export class ListAxles {
  constructor(private readonly axleRepository: AxleRepository) { }

  async execute() {
    return await this.axleRepository.list()
  }
}