import { Module } from "@nestjs/common";
import { TireController } from "./tire.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateTire } from "src/domain/tire/useCases/createTire";
import { GetTire } from "src/domain/tire/useCases/getTire";
import { UpdateTire } from "src/domain/tire/useCases/updateTire";

@Module({
  controllers: [TireController],
  imports: [DatabaseModule],
  providers: [
    CreateTire,
    GetTire,
    UpdateTire,
  ],
})

export class TireModule { }