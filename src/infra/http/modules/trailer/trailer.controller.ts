import { Body, Controller, Post } from "@nestjs/common";
import { CreateTrailerBody } from "./dtos/createTrailer.dto";
import { CreateTrailer } from "src/modules/trailer/useCases/createTrailer";

@Controller("trailers")
export class TrailerController {
  constructor(private readonly createTrailer: CreateTrailer) { }

  @Post()
  async create(@Body() trailer: CreateTrailerBody) {
    return await this.createTrailer.execute(trailer);
  }

}
