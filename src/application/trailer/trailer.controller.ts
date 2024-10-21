import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateTrailerBody } from "./dtos/createTrailer.dto";
import { CreateTrailer } from "src/domain/trailer/useCases/createTrailer";
import { GetTrailer } from "src/domain/trailer/useCases/getTrailer";
import { ListTrailers } from "src/domain/trailer/useCases/listTrailers";
import { Cookies } from "src/infra/http/auth/decorators/cookies.decorator";
import { CookiesEnum } from "src/core/enum/cookies";

@Controller("trailers")
export class TrailerController {
  constructor(
    private readonly createTrailer: CreateTrailer,
    private readonly getTrailer: GetTrailer,
    private readonly listTrailers: ListTrailers,
  ) { }

  @Post()
  async create(
    @Body() trailer: CreateTrailerBody,
    @Cookies(CookiesEnum.CompanyId) companyId: string,
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
  async list(
    @Cookies(CookiesEnum.CompanyId) companyId: string
  ) {
    return await this.listTrailers.execute(companyId);
  }
}
