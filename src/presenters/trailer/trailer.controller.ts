import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CreateTrailerBody } from "./dtos/createTrailer.dto";
import { Cookies } from "src/infra/http/auth/decorators/cookies.decorator";
import { CookiesEnum } from "src/core/enum/cookies";
import { TrailerViewModel } from "./viewModel/trailerViewModel";
import { PolicyGuard } from "src/infra/http/auth/guards/policy.guard";
import { CompanyInstance } from "src/core/company/company-instance";
import { CreateTrailer } from "src/application/trailer/useCases/createTrailer";
import { GetTrailer } from "src/application/trailer/useCases/getTrailer";
import { ListTrailers } from "src/application/trailer/useCases/listTrailers";

@Controller("trailers")
@UseGuards(PolicyGuard)
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
    const companyInstance = CompanyInstance.create(companyId);
    const createdTrailer = await this.createTrailer.execute(
      companyInstance, 
      trailer
    );
    return TrailerViewModel.toHttp(createdTrailer);
  }

  @Get(":id")
  async get(@Param('id') trailerId: string) {
    return await this.getTrailer.execute(trailerId);
  }

  @Get()
  async list(
    @Cookies(CookiesEnum.CompanyId) companyId: string
  ) {
    const trailers = await this.listTrailers.execute(companyId);
    return trailers.map(TrailerViewModel.toHttp);
  }
}
