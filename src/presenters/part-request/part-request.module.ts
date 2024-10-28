import { Module } from "@nestjs/common";
import { PartRequestController } from "./part-request.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreatePartRequest } from "src/application/part-request/use-cases/create-part-request";

@Module({
  controllers: [PartRequestController],
  imports: [DatabaseModule],
  providers: [
    CreatePartRequest
  ]
})

export class PartRequestModule { }