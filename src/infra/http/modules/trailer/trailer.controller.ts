import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateTrailerBody } from "./dtos/createTrailer.dto";
import { CreateTrailer } from "src/modules/trailer/useCases/createTrailer";
import { GetTrailer } from "src/modules/trailer/useCases/getTrailer";

@Controller("trailers")
export class TrailerController {
  constructor(
    private readonly createTrailer: CreateTrailer,
    private readonly getTrailer: GetTrailer
  ) { }

  @Post()
  async create(@Body() trailer: CreateTrailerBody) {
    return await this.createTrailer.execute(trailer);
  }

  @Get(":id")
  async get(@Param('id') trailerId: string) {
    return await this.getTrailer.execute(trailerId);
  }
}
