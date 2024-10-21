import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateTrailerBody } from "./dtos/createTrailer.dto";
import { CreateTrailer } from "src/modules/trailer/useCases/createTrailer";
import { GetTrailer } from "src/modules/trailer/useCases/getTrailer";
import { ListTrailers } from "src/modules/trailer/useCases/listTrailers";

@Controller("trailers")
export class TrailerController {
  constructor(
    private readonly createTrailer: CreateTrailer,
    private readonly getTrailer: GetTrailer,
    private readonly listTrailers: ListTrailers
  ) { }

  @Post(":id")
  async create(
    @Param("id") companyId: string,
    @Body() trailer: CreateTrailerBody
  ) {
    return await this.createTrailer.execute({
      ...trailer,
      companyId
    });
  }

  @Get(":id")
  async get(@Param('id') trailerId: string) {
    return await this.getTrailer.execute(trailerId);
  }

  @Get()
  async list() {
    return await this.listTrailers.execute();
  }
}
