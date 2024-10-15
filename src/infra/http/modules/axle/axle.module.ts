import { Module } from "@nestjs/common";
import { AxleController } from "./axle.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateAxle } from "src/modules/axle/useCases/createAxle";
import { GetAxle } from "src/modules/axle/useCases/getAxle";

@Module({
  controllers: [AxleController],
  imports: [DatabaseModule],
  providers: [
    CreateAxle,
    GetAxle,
  ],
})

export class AxleModule {}