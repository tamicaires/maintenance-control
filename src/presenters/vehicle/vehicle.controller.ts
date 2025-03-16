import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CreateVehicleBody } from "./dto/createVehicleBody";
import { Cookies } from "src/infra/http/auth/decorators/cookies.decorator";
import { CookiesEnum } from "src/core/enum/cookies";
import { CompanyInstance } from "src/core/company/company-instance";
import { VehicleViewModel } from "./viewModel/vehicleViewModel";
import { CreateVehicle } from "src/application/vehicle/useCases/createVehicle";
import { ListVehicles } from "src/application/vehicle/useCases/listVehicles";
import { IVehicleWithCount } from "src/shared/types/vehicle";

@Controller("vehicles")
export class VehicleController {
  constructor(
    private readonly createVehicle: CreateVehicle,
    private readonly listVehicles: ListVehicles
  ) { }

  @Post()
  async create(
    @Body() data: CreateVehicleBody,
    @Cookies(CookiesEnum.CompanyId) companyId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    return await this.createVehicle.execute(companyInstance, data);
  }

  @Get()
  async list(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Query('page') page?: string,
    @Query('perPage') perPage?: string,
    @Query('plate') plate?: string,
    @Query('km') km?: string,
    @Query('isActive') isActive?: boolean,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<IVehicleWithCount> {
    const companyInstance = CompanyInstance.create(companyId);
    const queries = {
      page,
      perPage,
      plate,
      km,
      isActive,
      startDate,
      endDate
    }

    return await this.listVehicles.execute(companyInstance, queries);
  }
}