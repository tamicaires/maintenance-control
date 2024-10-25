import { Injectable } from "@nestjs/common";
import { VehicleRepository } from "../../../core/domain/repositories/vechicle-repository";
import { CompanyInstance } from "src/core/company/company-instance";

@Injectable()
export class ListVehicles {
  constructor(private readonly vehicleRepository: VehicleRepository) { }

  async execute(companyInstance: CompanyInstance) {
    return await this.vehicleRepository.list(companyInstance);
  }
}