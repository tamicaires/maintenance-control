import { Injectable } from "@nestjs/common";
import { TrailerRepository } from "../../../core/domain/repositories/trailer-repository";
import { CompanyInstance } from "src/core/company/company-instance";
import { IUseCase } from "src/shared/protocols/use-case";
import { ITrailerFilters } from "src/shared/types/filters.interface";
import { ITrailerWithCount } from "src/shared/types/part-request/trailer.type";

interface IRequest {
  page?: string;
  perPage?: string;
  isActive?: boolean;
  fleetNumber?: string;
  startDate?: string;
  endDate?: string;
}

@Injectable()
export class ListTrailers implements IUseCase<IRequest, ITrailerWithCount> {
  constructor(private readonly trailerRepository: TrailerRepository) { }

  async execute(companyInstance: CompanyInstance, data: IRequest): Promise<ITrailerWithCount> {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PERPAGE = 5;

    const currentPage = Number(data.page) || DEFAULT_PAGE;
    const currentPerPage = Number(data.perPage) || DEFAULT_PERPAGE;

    const filters: ITrailerFilters = {
      fleetNumber: data.fleetNumber,
      isActive: data.isActive,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    }

    return await this.trailerRepository.list(
      companyInstance,
      currentPage,
      currentPerPage,
      filters
    );
  }
}