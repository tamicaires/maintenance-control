import { Module } from "@nestjs/common";
import { TireController } from "./tire.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateTire } from "src/modules/tire/useCases/createTire";

@Module({
  controllers: [TireController],
  imports: [DatabaseModule],
  providers: [
    CreateTire,
  ],
})

export class TireModule { }