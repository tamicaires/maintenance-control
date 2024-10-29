import { Module } from "@nestjs/common";
import { PartRequestController } from "./part-request.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreatePartRequest } from "src/application/part-request/use-cases/create-part-request";
import { ListPartRequests } from "src/application/part-request/use-cases/list-part-request";
import { RejectPartRequest } from "src/application/part-request/use-cases/reject-part-request";
import { ApprovePartRequest } from "src/application/part-request/use-cases/approve-part-request";

@Module({
  controllers: [PartRequestController],
  imports: [DatabaseModule],
  providers: [
    CreatePartRequest,
    ListPartRequests,
    RejectPartRequest,
    ApprovePartRequest
  ]
})

export class PartRequestModule { }