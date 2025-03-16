import { Injectable } from "@nestjs/common";
import { VehicleRepository } from "../../../core/domain/repositories/vechicle-repository";
import { CompanyInstance } from "src/core/company/company-instance";
import { IUseCase } from "src/shared/protocols/use-case";
import { IVehicleFilters } from "src/shared/types/filters.interface";
import { IVehicleWithCount } from "src/shared/types/vehicle";

interface IRequest {
  page?: string;
  perPage?: string;
  plate?: string;
  km?: string;
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
}

@Injectable()
export class ListVehicles implements IUseCase<IRequest, IVehicleWithCount> {
  constructor(private readonly vehicleRepository: VehicleRepository) { }

  async execute(companyInstance: CompanyInstance, data: IRequest): Promise<IVehicleWithCount> {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PERPAGE = 5;

    const currentPage = Number(data.page) || DEFAULT_PAGE;
    const currentPerPage = Number(data.perPage) || DEFAULT_PERPAGE;

    const filters: IVehicleFilters = {
      isActive: data.isActive,
      plate: data.plate,
      km: data.km,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    }

    return await this.vehicleRepository.list(
      companyInstance,
      currentPage,
      currentPerPage,
      filters
    );
  }
}