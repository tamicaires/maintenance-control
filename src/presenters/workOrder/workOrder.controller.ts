import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { CreateWorkOrderBody } from './dtos/createWorkOrderBody';
import { UpdateWorkOrderBody } from './dtos/updateWorkOrderBody';
import {
  mapUpdateWorkOrderData,
} from 'src/shared/utils/workOrderUtils';
import { WorkOrderViewModel } from './view-models/work-order-view-model';
import { CreateWorkOrder } from 'src/application/work-order/useCases/createWorkOrder/createWorkOrder';
import { UpdateWorkOrder } from 'src/application/work-order/useCases/updateWorkOrder/updateWorkOrder';
import { DeleteWorkOrder } from 'src/application/work-order/useCases/deleteWorkOrder/deleteWorkOrder';
import { GetManyWorkOrders } from 'src/application/work-order/useCases/getManyWorkOrders/getManyWorkOrders';
import { AuthenticatedRequestModel } from 'src/infra/http/auth/models/authenticateRequestModel';
import { CookiesEnum } from 'src/core/enum/cookies';
import { CompanyInstance } from 'src/core/company/company-instance';
import { Cookies } from 'src/infra/http/auth/decorators/cookies.decorator';
import { CancelWorkOrder } from 'src/application/work-order/useCases/cancel-work-order';
import { StartMaintenanceWorkOrder } from 'src/application/work-order/useCases/start-maintenance';
import { StartMaintenanceDto } from './dtos/start-maintenance';
import { FinishMaintenanceWorkOrder } from 'src/application/work-order/useCases/finish-maintenance';
import { FinishMaintenanceDto } from './dtos/finish-maintenance';
import { BackToQueueWorkOrder } from 'src/application/work-order/useCases/back-to-queue';
import { StartWaitingParts } from 'src/application/work-order/useCases/start-waiting-parts';
import { StartWaitingPartsDto } from './dtos/start-waiting-parts';
import { FinishWaitingParts } from 'src/application/work-order/useCases/finish-waiting-parts';
import { FinishWaitingPartsDto } from './dtos/finish-waiting-parts';
import { GetWorkOrderById } from 'src/application/work-order/useCases/get-work-order-by-id';

@Controller('work-orders')
export class WorkOrderController {
  constructor(
    private createWorkOrder: CreateWorkOrder,
    private updateWorkOrder: UpdateWorkOrder,
    private deleteWorkOrder: DeleteWorkOrder,
    private getManyWorkOrder: GetManyWorkOrders,
    private readonly cancelWorkOrder: CancelWorkOrder,
    private readonly startMaintenanceWorkOrder: StartMaintenanceWorkOrder,
    private readonly finishMaintenanceWorkOrder: FinishMaintenanceWorkOrder,
    private readonly backToQueueWorkOrder: BackToQueueWorkOrder,
    private readonly startWaitingPartsWorkOrder: StartWaitingParts,
    private readonly finishWaitingPartsWorkOrder: FinishWaitingParts,
    private readonly getWorkOrderById: GetWorkOrderById
  ) { }

  @Post()
  async create(
    @Request() request: AuthenticatedRequestModel,
    @Body() body: CreateWorkOrderBody,
    @Cookies(CookiesEnum.CompanyId) companyId: string,
  ) {
    const currentUser = request.user;

    const companyInstance = CompanyInstance.create(companyId);

    const workOrder = await this.createWorkOrder.execute(companyInstance, {
      ...body,
      userId: currentUser.id,
    });

    return workOrder;
  }

  @Put(':id')
  async update(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') workOrderId: string,
    @Body() updateWorkOrderBody: UpdateWorkOrderBody,
    @Cookies(CookiesEnum.CompanyId) companyId: string,
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    const currentUser = request.user;

    const workOrderData = mapUpdateWorkOrderData(
      workOrderId,
      currentUser.id,
      currentUser.name,
      updateWorkOrderBody,
    );

    const workOrder = await this.updateWorkOrder.execute(companyInstance, workOrderData);

    return workOrder;
  }

  @Delete(':id')
  async delete(
    @Param('id') workOrderId: string,
    @Cookies(CookiesEnum.CompanyId) companyId: string,
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    await this.deleteWorkOrder.execute(companyInstance, workOrderId);
  }

  @Get(':id/order')
  async getWithRelationalData(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Param('id') workOrderId: string,
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    const workOrder = await this.getWorkOrderById.execute(companyInstance, workOrderId);
    return WorkOrderViewModel.toHttp(workOrder);
  }

  @Get()
  async getMany(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('status') status?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const workOrders = await this.getManyWorkOrder.execute({
      page,
      perPage,
      status,
      startDate,
      endDate,
    });

    return workOrders.map(WorkOrderViewModel.toHttp);
  }

  @Patch(':id/cancel')
  async cancel(
    @Param('id') workOrderId: string,
    @Cookies(CookiesEnum.CompanyId) companyId: string,
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    return await this.cancelWorkOrder.execute(companyInstance, workOrderId);
  }

  @Patch(':id/start-maintenance')
  async startMaintenance(
    @Param('id') workOrderId: string,
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Body() data: StartMaintenanceDto,
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    return await this.startMaintenanceWorkOrder.execute(companyInstance, workOrderId, data);
  }

  @Patch(':id/finish-maintenance')
  async finishMaintenance(
    @Param('id') workOrderId: string,
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Body() data: FinishMaintenanceDto,
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    return await this.finishMaintenanceWorkOrder.execute(
      companyInstance,
      workOrderId,
      data
    );
  }

  @Patch(':id/back-to-queue')
  async backToQueue(
    @Param('id') workOrderId: string,
    @Cookies(CookiesEnum.CompanyId) companyId: string,
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    return await this.backToQueueWorkOrder.execute(
      companyInstance,
      workOrderId,
    );
  }

  @Patch(':id/start-waiting-parts')
  async startWaitingParts(
    @Param('id') workOrderId: string,
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Body() data: StartWaitingPartsDto,
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    const response = await this.startWaitingPartsWorkOrder.execute(
      companyInstance,
      workOrderId,
      data
    );

    return {
      message: "Ordem de serviço retornada para fila com sucesso",
      data: response,
    }
  }

  @Patch(':id/finish-waiting-parts')
  async finishWaitingParts(
    @Param('id') workOrderId: string,
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Body() data: FinishWaitingPartsDto,
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    return await this.finishWaitingPartsWorkOrder.execute(
      companyInstance,
      workOrderId,
      data
    );
  }
}
