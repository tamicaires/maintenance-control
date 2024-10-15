import { Module } from "@nestjs/common";
import { TireController } from "./tire.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateTire } from "src/modules/tire/useCases/createTire";
import { GetTire } from "src/modules/tire/useCases/getTire";

@Module({
  controllers: [TireController],
  imports: [DatabaseModule],
  providers: [
    CreateTire,
    GetTire,
  ],
})

export class TireModule { }