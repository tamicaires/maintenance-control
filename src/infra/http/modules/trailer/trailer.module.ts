import { Module } from "@nestjs/common";
import { TrailerController } from "./trailer.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateTrailer } from "src/modules/trailer/useCases/createTrailer";
import { GetTrailer } from "src/modules/trailer/useCases/getTrailer";

@Module({
  controllers: [TrailerController],
  imports: [DatabaseModule],
  providers: [
    CreateTrailer,
    GetTrailer
  ],
})

export class TrailerModule { }