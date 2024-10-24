import { CompanyInstance } from "src/core/company/company-instance";
import { Vehicle } from "../entities/vehicle";

export abstract class VehicleRepository {
  abstract create(companyInstance: CompanyInstance, vehicle: Vehicle): Promise<Vehicle>;
  abstract findByPlate(companyInstance: CompanyInstance, plate: string): Promise<Vehicle | null>;
  abstract list(companyInstance: CompanyInstance): Promise<Vehicle[]>;
}