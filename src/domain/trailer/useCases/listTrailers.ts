import { Injectable } from "@nestjs/common";
import { TrailerRepository } from "../repositories/trailerRepository";

@Injectable()
export class ListTrailers {
  constructor(private readonly trailerRepository: TrailerRepository) { }

  async execute() {
    return await this.trailerRepository.list();
  }
}