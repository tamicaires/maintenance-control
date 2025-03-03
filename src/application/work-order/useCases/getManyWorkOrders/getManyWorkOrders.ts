import { Injectable } from '@nestjs/common';
import { WorkOrderRepository } from '../../../../core/domain/repositories/work-order-repository';
import { MaintenanceStatus } from 'src/core/enum/maitenance-status.enum';
import { TypeOfMaintenance } from 'src/core/enum/type-of-maintenance.enum';
import { IUseCase } from 'src/shared/protocols/use-case';
import { CompanyInstance } from 'src/core/company/company-instance';
import { MaintenanceFilters } from 'src/shared/types/filters.interface';

interface IRequest {
  page?: string;
  perPage?: string;
  fleetNumber?: string;
  displayId?: string;
  typeOfMaintenance?: TypeOfMaintenance | TypeOfMaintenance[];
  severityLevel?: string | string[];
  status?: MaintenanceStatus | MaintenanceStatus[];
  startDate?: string;
  endDate?: string;
}

@Injectable()
export class GetManyWorkOrders implements IUseCase<IRequest, any> {
  constructor(private workOrderRepository: WorkOrderRepository) { }

  async execute(companyInstance: CompanyInstance, data: IRequest) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PERPAGE = 5;

    const currentPage = Number(data.page) || DEFAULT_PAGE;
    const currentPerPage = Number(data.perPage) || DEFAULT_PERPAGE;

    const filters: MaintenanceFilters = {
      fleetNumber: data.fleetNumber,
      displayId: data.displayId,
      typeOfMaintenance: data.typeOfMaintenance,
      severityLevel: data.severityLevel,
      status: data.status,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    };

    const workOrders = await this.workOrderRepository.findMany(
      companyInstance,
      currentPage,
      currentPerPage,
      filters,
    );

    return workOrders;
  }
}
