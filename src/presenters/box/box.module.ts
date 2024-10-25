import { Module } from "@nestjs/common";
import { BoxController } from "./box.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateBox } from "src/application/box/useCases/create-box";

@Module({
  controllers: [BoxController],
  imports: [DatabaseModule],
  providers: [
    CreateBox
  ]
})

export class BoxModule { }