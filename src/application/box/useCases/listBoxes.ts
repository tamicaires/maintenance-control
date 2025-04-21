import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { Box } from "src/core/domain/entities/box";
import { BoxRepository } from "src/core/domain/repositories/box-repository";
import { IUseCase } from "src/shared/protocols/use-case";
import { IBoxWithCount } from "src/shared/types/box";
import { IBoxFilters } from "src/shared/types/filters.interface";

interface IRequest {
  page?: string;
  perPage?: string;
  boxName?: string;
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
}

@Injectable()
export class ListBoxes implements IUseCase<IRequest, IBoxWithCount> {
  constructor(private readonly boxRepository: BoxRepository) { }

  async execute(companyInstante: CompanyInstance, request: IRequest): Promise<IBoxWithCount> {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PERPAGE = 5;

    const currentPage = Number(request.page) || DEFAULT_PAGE;
    const currentPerPage = Number(request.perPage) || DEFAULT_PERPAGE;

    const filters: IBoxFilters = {
      boxName: request.boxName,
      isActive: request.isActive,
      startDate: request.startDate ? new Date(request.startDate) : undefined,
      endDate: request.endDate ? new Date(request.endDate) : undefined,
    };

    return await this.boxRepository.list(
      companyInstante,
      currentPage,
      currentPerPage,
      filters
    );
  }
} 