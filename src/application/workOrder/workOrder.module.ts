import { Module } from '@nestjs/common';
import { WorkOrderController } from './workOrder.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateWorkOrder } from 'src/domain/workOrder/useCases/createWorkOrder/createWorkOrder';
import { DeleteWorkOrder } from 'src/domain/workOrder/useCases/deleteWorkOrder/deleteWorkOrder';
import { GetManyWorkOrders } from 'src/domain/workOrder/useCases/getManyWorkOrders/getManyWorkOrders';
import { UpdateWorkOrder } from 'src/domain/workOrder/useCases/updateWorkOrder/updateWorkOrder';

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
