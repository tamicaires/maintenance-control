import { CompanyInstance } from "src/core/company/company-instance";
import { Vehicle, Vehicles } from "../entities/vehicle";
import { IVehicleFilters } from "src/shared/types/filters.interface";
import { IVehicleWithCount } from "src/shared/types/vehicle";

export abstract class VehicleRepository {
  abstract create(companyInstance: CompanyInstance, vehicle: Vehicles): Promise<Vehicles>;
  abstract findByPlate(companyInstance: CompanyInstance, plate: string): Promise<Vehicle | null>;
  abstract list(
    companyInstance: CompanyInstance,
    page: number,
    perPage: number,
    filters: IVehicleFilters,
  ): Promise<IVehicleWithCount>;
}