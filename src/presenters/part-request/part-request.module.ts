import { Module } from "@nestjs/common";
import { PartRequestController } from "./part-request.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreatePartRequest } from "src/application/part-request/use-cases/create-part-request";
import { ListPartRequests } from "src/application/part-request/use-cases/list-part-request";

@Module({
  controllers: [PartRequestController],
  imports: [DatabaseModule],
  providers: [
    CreatePartRequest,
    ListPartRequests,
  ]
})

export class PartRequestModule { }