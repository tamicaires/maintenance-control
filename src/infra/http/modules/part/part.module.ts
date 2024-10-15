import { Module } from "@nestjs/common";
import { PartController } from "./part.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreatePart } from "src/modules/part/useCases/createPart";
import { GetPart } from "src/modules/part/useCases/getPart";

@Module({
  controllers: [PartController],
  imports: [DatabaseModule],
  providers: [
    CreatePart,
    GetPart,
  ]
})

export class PartModule { }