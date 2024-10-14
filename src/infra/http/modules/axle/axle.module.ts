import { Module } from "@nestjs/common";
import { AxleController } from "./axle.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateAxle } from "src/modules/axle/useCases/createAxle";

@Module({
  controllers: [AxleController],
  imports: [DatabaseModule],
  providers: [
    CreateAxle
  ],
})

export class AxleModule {}