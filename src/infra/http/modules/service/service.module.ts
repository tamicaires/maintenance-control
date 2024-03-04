import { Module } from "@nestjs/common";
import { ServiceController } from "./service.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateService } from "src/modules/service/useCases/createServiceUseCase/createService";
import { UpdateService } from "src/modules/service/useCases/updateServiceUseCase/updateService";
import { DeleteService } from "src/modules/service/useCases/deleteServiceUseCase/deleteService";
import { GetService } from "src/modules/service/useCases/getServiceUseCase/getService";
import { GetManyServices } from "src/modules/service/useCases/getManyServicesUseCase/getManyServices";

@Module({
  controllers: [ServiceController],
  imports: [DatabaseModule],
  providers: [
    CreateService,
    UpdateService,
    DeleteService,
    GetService,
    GetManyServices
  ]
})

export class ServiceModule {};
