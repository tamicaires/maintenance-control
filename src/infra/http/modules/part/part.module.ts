import { Module } from "@nestjs/common";
import { PartController } from "./part.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreatePart } from "src/modules/part/useCases/createPart";
import { GetPart } from "src/modules/part/useCases/getPart";
import { ListParts } from "src/modules/part/useCases/listParts";
import { UpdatePart } from "src/modules/part/useCases/updatePart";

@Module({
  controllers: [PartController],
  imports: [DatabaseModule],
  providers: [
    CreatePart,
    GetPart,
    ListParts,
    UpdatePart,
  ]
})

export class PartModule { }