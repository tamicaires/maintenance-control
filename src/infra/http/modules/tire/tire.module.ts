import { Module } from "@nestjs/common";
import { TireController } from "./tire.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateTire } from "src/modules/tire/useCases/createTire";
import { GetTire } from "src/modules/tire/useCases/getTire";
import { UpdateTire } from "src/modules/tire/useCases/updateTire";

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