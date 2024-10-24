import { Module } from "@nestjs/common";
import { VehicleController } from "./vehicle.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateVehicle } from "src/domain/vehicle/useCases/createVehicle";

@Module({
  controllers: [VehicleController],
  imports: [DatabaseModule],
  providers: [CreateVehicle]
})

export class VehicleModule { }