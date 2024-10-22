import { Module } from "@nestjs/common";
import { TrailerController } from "./trailer.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateTrailer } from "src/domain/trailer/useCases/createTrailer";
import { GetTrailer } from "src/domain/trailer/useCases/getTrailer";
import { ListTrailers } from "src/domain/trailer/useCases/listTrailers";
import { CheckUserMembership } from "src/domain/memberShip/useCases/checkUserMembership";

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