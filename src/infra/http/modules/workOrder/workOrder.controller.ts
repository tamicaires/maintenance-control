import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateWorkOrder } from "src/modules/workOrder/useCases/createWorkOrderUseCase/createWorkOrder";
import { CreateWorkOrderBody } from "./dtos/createWorkOrderBody";
import { UpdateWorkOrderBody } from "./dtos/updateWorkOrderBody";
import { UpdateWorkOrder } from "src/modules/workOrder/useCases/updateWorkOrderUseCase/updateWorkOrder";
import { mapUpdateWorkOrderData } from "src/utils/workOrderUtils";
import { DeleteWorkOrder } from "src/modules/workOrder/useCases/deleteWorkOrderUseCase/deleteWorkOrder";
import { GetWorkOrder } from "src/modules/workOrder/useCases/getWorkOrderUseCase/getWorkOrder";
import { WorkOrderViewModel } from "./viewModels/workOrderViewModel";
import { GetManyWorkOrders } from "src/modules/workOrder/useCases/getManyWorkOrdersUseCase/getManyWorkOrders";


@Controller('work-orders')
export class WorkOrderController {
  constructor(
    private createWorkOrder: CreateWorkOrder,
    private updateWorkOrder: UpdateWorkOrder,
    private deleteWorkOrder: DeleteWorkOrder,
    private getWorkOrder: GetWorkOrder,
    private getManyWorkOrder: GetManyWorkOrders
  ){}

  @Post()
  async create(@Body() createWorkOrderBody: CreateWorkOrderBody){
    const workOrderData = createWorkOrderBody;

    const workOrder = await this.createWorkOrder.execute(
      workOrderData
    );
    
    return workOrder;
  };

  @Put(':id')
  async update(
    @Param('id') workOrderId: string,
    @Body() updateWorkOrderBody: UpdateWorkOrderBody
  ){
    const workOrderData = mapUpdateWorkOrderData(
      workOrderId,
      updateWorkOrderBody
      );

    const workOrder = await this.updateWorkOrder.execute(workOrderData);

    return workOrder;
  };

  @Delete(':id')
  async delete(@Param('id') workOrderId: string){
    await this.deleteWorkOrder.execute({ workOrderId });
  };

  @Get(':id')
  async getOne(@Param('id') workOrderId: string){
    const workOrder = await this.getWorkOrder.execute({ workOrderId });
    
    return WorkOrderViewModel.toHttp(workOrder);
  };

  @Get()
  async getMany(
    @Query('page') page: string,
    @Query('perPage') perPage: string
  ){
    const workOrders = await this.getManyWorkOrder.execute({
      page,
      perPage
    });

    return workOrders.map(WorkOrderViewModel.toHttp)
  };
};