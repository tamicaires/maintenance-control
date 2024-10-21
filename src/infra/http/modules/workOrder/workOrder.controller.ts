import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { CreateWorkOrderBody } from './dtos/createWorkOrderBody';
import { UpdateWorkOrderBody } from './dtos/updateWorkOrderBody';
import {
  mapCreateWorkOrderData,
  mapUpdateWorkOrderData,
} from 'src/shared/utils/workOrderUtils';
import { AuthenticatedRequestModel } from '../auth/models/authenticateRequestModel';
import { WorkOrderViewModel } from './viewModels/workOrdersViewModel';
import { CreateWorkOrder } from 'src/domain/workOrder/useCases/createWorkOrder/createWorkOrder';
import { UpdateWorkOrder } from 'src/domain/workOrder/useCases/updateWorkOrder/updateWorkOrder';
import { DeleteWorkOrder } from 'src/domain/workOrder/useCases/deleteWorkOrder/deleteWorkOrder';
import { GetManyWorkOrders } from 'src/domain/workOrder/useCases/getManyWorkOrders/getManyWorkOrders';

@Controller('work-orders')
export class WorkOrderController {
  constructor(
    private createWorkOrder: CreateWorkOrder,
    private updateWorkOrder: UpdateWorkOrder,
    private deleteWorkOrder: DeleteWorkOrder,
    private getManyWorkOrder: GetManyWorkOrders,
  ) { }

  @Post()
  async create(
    @Request() request: AuthenticatedRequestModel,
    @Body() createWorkOrderBody: CreateWorkOrderBody,
  ) {
    const currentUser = request.user;
    console.log(createWorkOrderBody);
    const workOrderData = mapCreateWorkOrderData(
      currentUser.id,
      currentUser.name,
      createWorkOrderBody,
    );

    const workOrder = await this.createWorkOrder.execute({
      ...workOrderData,
      companyId: currentUser.companyId,
    });

    return workOrder;
  }

  @Put(':id')
  async update(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') workOrderId: string,
    @Body() updateWorkOrderBody: UpdateWorkOrderBody,
  ) {
    const currentUser = request.user;

    const workOrderData = mapUpdateWorkOrderData(
      workOrderId,
      currentUser.id,
      currentUser.name,
      updateWorkOrderBody,
    );

    const workOrder = await this.updateWorkOrder.execute(workOrderData);

    return workOrder;
  }

  @Delete(':id')
  async delete(@Param('id') workOrderId: string) {
    await this.deleteWorkOrder.execute({ workOrderId });
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
}
