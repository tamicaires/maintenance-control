import { Module } from '@nestjs/common';
import { WorkOrderController } from './workOrder.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateWorkOrder } from 'src/application/work-order/useCases/createWorkOrder/createWorkOrder';
import { DeleteWorkOrder } from 'src/application/work-order/useCases/deleteWorkOrder/deleteWorkOrder';
import { GetManyWorkOrders } from 'src/application/work-order/useCases/getManyWorkOrders/getManyWorkOrders';
import { UpdateWorkOrder } from 'src/application/work-order/useCases/updateWorkOrder/updateWorkOrder';
import { CancelWorkOrder } from 'src/application/work-order/useCases/cancel-work-order';
import { StartMaintenanceWorkOrder } from 'src/application/work-order/useCases/start-maintenance';
import { FinishMaintenanceWorkOrder } from 'src/application/work-order/useCases/finish-maintenance';
import { BackToQueueWorkOrder } from 'src/application/work-order/useCases/back-to-queue';
import { StartWaitingParts } from 'src/application/work-order/useCases/start-waiting-parts';
import { FinishWaitingParts } from 'src/application/work-order/useCases/finish-waiting-parts';
import { GetWorkOrderById } from 'src/application/work-order/useCases/get-work-order-by-id';
import { GetDailyWorkOrdersData } from 'src/application/work-order/useCases/get-daily-work-orders-data';
import { GetQueueChart } from 'src/application/work-order/useCases/dashboard/get-queue-chart';
import { GetTypeMaintenanceChartData } from 'src/application/work-order/useCases/dashboard/get-type-maintenance-chart-data';
import { EventService } from 'src/application/event/service/event.service';
import { RegisterEvent } from 'src/application/event/use-cases/register-event';

@Module({
  controllers: [WorkOrderController],
  imports: [DatabaseModule],
  providers: [
    CreateWorkOrder,
    UpdateWorkOrder,
    DeleteWorkOrder,
    GetWorkOrderById,
    GetManyWorkOrders,
    CancelWorkOrder,
    StartMaintenanceWorkOrder,
    FinishMaintenanceWorkOrder,
    BackToQueueWorkOrder,
    StartWaitingParts,
    FinishWaitingParts,
    GetDailyWorkOrdersData,
    GetTypeMaintenanceChartData,
    GetQueueChart,
    EventService,
    RegisterEvent,
  ],
})
export class WorkOrderModule { }
