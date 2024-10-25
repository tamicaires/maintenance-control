import { Module } from '@nestjs/common';
import { WorkOrderController } from './workOrder.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateWorkOrder } from 'src/application/work-order/useCases/createWorkOrder/createWorkOrder';
import { DeleteWorkOrder } from 'src/application/work-order/useCases/deleteWorkOrder/deleteWorkOrder';
import { GetManyWorkOrders } from 'src/application/work-order/useCases/getManyWorkOrders/getManyWorkOrders';
import { UpdateWorkOrder } from 'src/application/work-order/useCases/updateWorkOrder/updateWorkOrder';

@Module({
  controllers: [WorkOrderController],
  imports: [DatabaseModule],
  providers: [
    CreateWorkOrder,
    UpdateWorkOrder,
    DeleteWorkOrder,
    GetManyWorkOrders,
  ],
})
export class WorkOrderModule {}
