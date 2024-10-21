import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateService } from 'src/domain/service/useCases/createService/createService';
import { DeleteService } from 'src/domain/service/useCases/deleteService/deleteService';
import { GetManyServices } from 'src/domain/service/useCases/getManyServices/getManyServices';
import { GetService } from 'src/domain/service/useCases/getService/getService';
import { GetServicesByWorkOrder } from 'src/domain/service/useCases/getServicesByWorkOrder/getServicesByWorkOrder.use-case';
import { UpdateService } from 'src/domain/service/useCases/updateService/updateService';

@Module({
  controllers: [ServiceController],
  imports: [DatabaseModule],
  providers: [
    CreateService,
    UpdateService,
    DeleteService,
    GetService,
    GetManyServices,
    GetServicesByWorkOrder,
  ],
})
export class ServiceModule {}
