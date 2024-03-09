import { Module } from "@nestjs/common";
import { ServiceController } from "./service.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateService } from "src/modules/service/useCases/createService/createService";
import { UpdateService } from "src/modules/service/useCases/updateService/updateService";
import { DeleteService } from "src/modules/service/useCases/deleteService/deleteService";
import { GetService } from "src/modules/service/useCases/getService/getService";
import { GetManyServices } from "src/modules/service/useCases/getManyServices/getManyServices";

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
