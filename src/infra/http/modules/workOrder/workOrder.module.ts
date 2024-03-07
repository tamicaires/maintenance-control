import { Module } from "@nestjs/common";
import { WorkOrderController } from "./workOrder.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateWorkOrder } from "src/modules/workOrder/useCases/createWorkOrderUseCase/createWorkOrder";
import { UpdateWorkOrder } from "src/modules/workOrder/useCases/updateWorkOrderUseCase/updateWorkOrder";
import { DeleteWorkOrder } from "src/modules/workOrder/useCases/deleteWorkOrderUseCase/deleteWorkOrder";
import { GetManyWorkOrders } from "src/modules/workOrder/useCases/getManyWorkOrdersUseCase/getManyWorkOrders";
import { GetWorkOrderServices } from "src/modules/workOrder/useCases/getWorkOrderWithServicesUseCase/getWorkOrderWithServices";

@Module({
  controllers: [WorkOrderController],
  imports: [DatabaseModule],
  providers: [
    CreateWorkOrder,
    UpdateWorkOrder,
    DeleteWorkOrder,
    GetManyWorkOrders,
    GetWorkOrderServices
  ]
})

export class WorkOrderModule {};