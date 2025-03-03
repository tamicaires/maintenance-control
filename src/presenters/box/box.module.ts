import { Module } from "@nestjs/common";
import { BoxController } from "./box.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateBox } from "src/application/box/useCases/create-box";
import { ListBoxes } from "src/application/box/useCases/listBoxes";
import { GetBoxesWithRelationalData } from "src/application/box/useCases/get-boxes-with-relational-data";
import { DeleteBox } from "src/application/box/useCases/delete-box";

@Module({
  controllers: [BoxController],
  imports: [DatabaseModule],
  providers: [
    CreateBox,
    ListBoxes,
    GetBoxesWithRelationalData,
    DeleteBox
  ]
})

export class BoxModule { }