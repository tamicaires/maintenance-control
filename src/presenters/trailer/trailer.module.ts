import { Module } from "@nestjs/common";
import { TrailerController } from "./trailer.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CheckUserMembership } from "src/application/membership/useCases/checkUserMembership";
import { CreateTrailer } from "src/application/trailer/useCases/createTrailer";
import { GetTrailer } from "src/application/trailer/useCases/getTrailer";
import { ListTrailers } from "src/application/trailer/useCases/listTrailers";

@Module({
  controllers: [TrailerController],
  imports: [DatabaseModule],
  providers: [
    CreateTrailer,
    GetTrailer,
    ListTrailers,
    CheckUserMembership,
  ],
})

export class TrailerModule { }