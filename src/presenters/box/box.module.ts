import { Module } from "@nestjs/common";
import { BoxController } from "./box.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateBox } from "src/application/box/useCases/create-box";
import { ListBoxes } from "src/application/box/useCases/listBoxes";

@Module({
  controllers: [BoxController],
  imports: [DatabaseModule],
  providers: [
    CreateBox,
    ListBoxes
  ]
})

export class BoxModule { }