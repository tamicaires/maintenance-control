import { Module } from "@nestjs/common";
import { VehicleController } from "./vehicle.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateVehicle } from "src/application/vehicle/useCases/createVehicle";
import { ListVehicles } from "src/application/vehicle/useCases/listVehicles";

@Module({
  controllers: [VehicleController],
  imports: [DatabaseModule],
  providers: [
    CreateVehicle,
    ListVehicles
  ]
})

export class VehicleModule { }