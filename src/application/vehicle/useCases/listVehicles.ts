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

  async execute(companyInstance: CompanyInstance, request: IRequest): Promise<IVehicleWithCount> {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PERPAGE = 5;

    const currentPage = Number(request.page) || DEFAULT_PAGE;
    const currentPerPage = Number(request.perPage) || DEFAULT_PERPAGE;

    const filters: IVehicleFilters = {
      isActive: request.isActive,
      plate: request.plate,
      km: request.km,
      startDate: request.startDate ? new Date(request.startDate) : undefined,
      endDate: request.endDate ? new Date(request.endDate) : undefined,
    }

    return await this.vehicleRepository.list(
      companyInstance,
      currentPage,
      currentPerPage,
      filters
    );
  }
}