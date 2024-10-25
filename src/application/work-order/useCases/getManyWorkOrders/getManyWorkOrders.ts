import { Injectable } from '@nestjs/common';
import { WorkOrderRepository } from '../../../../core/domain/repositories/work-order-repository';

interface GetManyWorkOrdersRequest {
  page?: string;
  perPage?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

@Injectable()
export class GetManyWorkOrders {
  constructor(private workOrderRepository: WorkOrderRepository) {}

  async execute({
    page,
    perPage,
    status,
    startDate,
    endDate,
  }: GetManyWorkOrdersRequest) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PERPAGE = 20;

    const currentPage = Number(page) || DEFAULT_PAGE;
    const currentPerPage = Number(perPage) || DEFAULT_PERPAGE;

    const filters = {
      status,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    };

    const workOrders = await this.workOrderRepository.findMany(
      currentPage,
      currentPerPage,
      filters,
    );

    return workOrders;
  }
}
