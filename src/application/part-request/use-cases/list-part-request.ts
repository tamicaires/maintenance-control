import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { PartRequestRepository } from "src/core/domain/repositories/part-request-repository";
import { RequestStatus } from "src/core/enum/part-request";
import { IUseCase } from "src/shared/protocols/use-case";
import { IPartRequestsRelationalDataList } from "src/shared/types/part-request/part-request-relational-data";

interface GetManyWorkOrdersRequest {
  status?: RequestStatus;
  page?: string;
  perPage?: string;
  startDate?: string;
  endDate?: string;
}

@Injectable()
export class ListPartRequests implements IUseCase<GetManyWorkOrdersRequest, IPartRequestsRelationalDataList> {
  constructor(private readonly partRequestRepository: PartRequestRepository) { }

  async execute(companyInstance: CompanyInstance, request: GetManyWorkOrdersRequest): Promise<IPartRequestsRelationalDataList> {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PERPAGE = 20;

    const currentPage = Number(request.page) || DEFAULT_PAGE;
    const currentPerPage = Number(request.perPage) || DEFAULT_PERPAGE;

    const filters = {
      status: request.status ?? undefined,
      startDate: request.startDate ? new Date(request.startDate) : undefined,
      endDate: request.endDate ? new Date(request.endDate) : undefined,
    };

    return this.partRequestRepository.list(
      companyInstance,
      currentPage,
      currentPerPage,
      filters
    );
  }
}