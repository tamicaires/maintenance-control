import { Body, Controller, Post } from "@nestjs/common";
import { CreateVehicleBody } from "./dto/createVehicleBody";
import { Cookies } from "src/infra/http/auth/decorators/cookies.decorator";
import { CookiesEnum } from "src/core/enum/cookies";
import { CompanyInstance } from "src/core/company/company-instance";
import { CreateVehicle } from "src/domain/vehicle/useCases/createVehicle";

@Controller("vehicles")
export class VehicleController {
  constructor(
    private readonly createVehicle: CreateVehicle
  ) { }

  @Post()
  async create(
    @Body() data: CreateVehicleBody,
    @Cookies(CookiesEnum.CompanyId) companyId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    return await this.createVehicle.execute(companyInstance, data);
  }
}