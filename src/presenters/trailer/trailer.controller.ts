import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { CreateTrailerBody } from "./dtos/createTrailer.dto";
import { Cookies } from "src/infra/http/auth/decorators/cookies.decorator";
import { CookiesEnum } from "src/core/enum/cookies";
import { PolicyGuard } from "src/infra/http/auth/guards/policy.guard";
import { CompanyInstance } from "src/core/company/company-instance";
import { CreateTrailer } from "src/application/trailer/useCases/createTrailer";
import { GetTrailer } from "src/application/trailer/useCases/getTrailer";
import { ListTrailers } from "src/application/trailer/useCases/listTrailers";
import { GetTrailersByWorkOrder } from "src/application/trailer/useCases/get-trailers-by-work-order";

@Controller("trailers")
@UseGuards(PolicyGuard)
export class TrailerController {
  constructor(
    private readonly createTrailer: CreateTrailer,
    private readonly getTrailer: GetTrailer,
    private readonly listTrailers: ListTrailers,
    private readonly listTrailersByWorkOrder: GetTrailersByWorkOrder
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
    return createdTrailer;
  }

  @Get(":id")
  async get(@Param('id') trailerId: string,
    @Cookies(CookiesEnum.CompanyId) companyId: string,
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    return await this.getTrailer.execute(companyInstance, trailerId);
  }

  @Get()
  async list(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Query('isActive') isActive: boolean,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    const queries = {
      isActive,
      page,
      perPage,
      startDate,
      endDate
    }
    return await this.listTrailers.execute(companyInstance, queries);
  }

  @Get("work-order/:id")
  async listByFleet(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Param("id") workOrderId: string
  ) {

    const companyInstance = CompanyInstance.create(companyId);

    const trailers = await this.listTrailersByWorkOrder.execute(companyInstance, workOrderId);
    return trailers;
  }
}
