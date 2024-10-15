import { Module } from "@nestjs/common";
import { PartController } from "./part.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreatePart } from "src/modules/part/useCases/createPart";

@Module({
  controllers: [PartController],
  imports: [DatabaseModule],
  providers: [
    CreatePart
  ]
})

export class PartModule {}