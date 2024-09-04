import { Injectable } from '@nestjs/common';
import { WorkOrderRepository } from '../../repositories/workOrderRepository';

interface GetManyWorkOrdersRequest {
  page?: string;
  perPage?: string;
}

@Injectable()
export class GetManyWorkOrders {
  constructor(private workOrderRepository: WorkOrderRepository) {}
  async execute({ page, perPage }: GetManyWorkOrdersRequest) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PERPAGE = 20;

    const currentPage = Number(page) || DEFAULT_PAGE;
    const currentPerPage = Number(perPage) || DEFAULT_PERPAGE;

    const workOrders = await this.workOrderRepository.findMany(
      currentPage,
      currentPerPage,
    );

    return workOrders;
  }
}
