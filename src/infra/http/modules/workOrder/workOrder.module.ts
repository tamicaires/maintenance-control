import { Module } from "@nestjs/common";
import { WorkOrderController } from "./workOrder.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateWorkOrder } from "src/modules/workOrder/useCases/createWorkOrder/createWorkOrder";
import { UpdateWorkOrder } from "src/modules/workOrder/useCases/updateWorkOrder/updateWorkOrder";
import { DeleteWorkOrder } from "src/modules/workOrder/useCases/deleteWorkOrder/deleteWorkOrder";
import { GetManyWorkOrders } from "src/modules/workOrder/useCases/getManyWorkOrders/getManyWorkOrders";
import { GetWorkOrderServices } from "src/modules/workOrder/useCases/getWorkOrderWithServices/getWorkOrderWithServices";

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