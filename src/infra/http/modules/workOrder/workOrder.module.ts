import { Module } from "@nestjs/common";
import { WorkOrderController } from "./workOrder.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateWorkOrder } from "src/modules/workOrder/useCases/createWorkOrderUseCase/createWorkOrder";
import { UpdateWorkOrder } from "src/modules/workOrder/useCases/updateWorkOrderUseCase/updateWorkOrder";
import { DeleteWorkOrder } from "src/modules/workOrder/useCases/deleteWorkOrderUseCase/deleteWorkOrder";
import { GetWorkOrder } from "src/modules/workOrder/useCases/getWorkOrderUseCase/getWorkOrder";
import { GetManyWorkOrders } from "src/modules/workOrder/useCases/getManyWorkOrdersUseCase/getManyWorkOrders";

@Module({
  controllers: [WorkOrderController],
  imports: [DatabaseModule],
  providers: [
    CreateWorkOrder,
    UpdateWorkOrder,
    DeleteWorkOrder,
    GetWorkOrder,
    GetManyWorkOrders
  ]
})

export class WorkOrderModule {};