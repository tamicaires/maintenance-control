import { Module } from "@nestjs/common";
import { PartController } from "./part.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreatePart } from "src/domain/part/useCases/createPart";
import { GetPart } from "src/domain/part/useCases/getPart";
import { ListParts } from "src/domain/part/useCases/listParts";
import { UpdatePart } from "src/domain/part/useCases/updatePart";

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