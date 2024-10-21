import { Module } from "@nestjs/common";
import { AxleController } from "./axle.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateAxle } from "src/domain/axle/useCases/createAxle";
import { GetAxle } from "src/domain/axle/useCases/getAxle";
import { ListAxles } from "src/domain/axle/useCases/listAxles";

@Module({
  controllers: [AxleController],
  imports: [DatabaseModule],
  providers: [
    CreateAxle,
    GetAxle,
    ListAxles,
  ],
})

export class AxleModule {}