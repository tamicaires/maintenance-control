import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateVehicleBody } from "./dto/createVehicleBody";
import { Cookies } from "src/infra/http/auth/decorators/cookies.decorator";
import { CookiesEnum } from "src/core/enum/cookies";
import { CompanyInstance } from "src/core/company/company-instance";
import { VehicleViewModel } from "./viewModel/vehicleViewModel";
import { CreateVehicle } from "src/application/vehicle/useCases/createVehicle";
import { ListVehicles } from "src/application/vehicle/useCases/listVehicles";

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
    @Cookies(CookiesEnum.CompanyId) companyId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    const vehicles = await this.listVehicles.execute(companyInstance);
    return vehicles.map(VehicleViewModel.toHttp)
  }
}