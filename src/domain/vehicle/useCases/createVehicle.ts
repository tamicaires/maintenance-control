import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { VehicleRepository } from "../repositories/VechicleRepository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";
import { Vehicle } from "../entitiy/Vehicle";

interface CreateVehicleRequest {
  plate: string;
  model: string;
  brand: string;
  year: string;
  color: string | null;
  km: number;
  power: number;
  isActive: boolean;
  fleetId: string;
}

@Injectable()
export class CreateVehicle {
  constructor(private readonly vehicleRepository: VehicleRepository) { }

  async execute(companyInstance: CompanyInstance, data: CreateVehicleRequest) {
    const vehicleExists = await this.vehicleRepository.findByPlate(companyInstance, data.plate);
    if (vehicleExists) {
      throw new ExceptionHandler({ message: "Placa já cadastrada", status: HttpStatus.CONFLICT });
    }

    const vehicle = new Vehicle(companyInstance.addCompanyFilter(data));

    return this.vehicleRepository.create(companyInstance, vehicle);
  }
}