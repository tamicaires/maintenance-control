import { Module } from "@nestjs/common";
import { PartRequestController } from "./part-request.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreatePartRequest } from "src/application/part-request/use-cases/create-part-request";
import { ListPartRequests } from "src/application/part-request/use-cases/list-part-request";
import { RejectPartRequest } from "src/application/part-request/use-cases/reject-part-request";
import { ApprovePartRequest } from "src/application/part-request/use-cases/approve-part-request";
import { CreatePartRequestBatch } from "src/application/part-request/use-cases/create-part-request-batch";
import { ListPartRequestByWorkOrder } from "src/application/part-request/use-cases/list-part-request-by-work-order";
import { GetPartRequestById } from "src/application/part-request/use-cases/get-part-request-by-id";

@Module({
  controllers: [PartRequestController],
  imports: [DatabaseModule],
  providers: [
    CreatePartRequest,
    CreatePartRequestBatch,
    GetPartRequestById,
    ListPartRequests,
    ListPartRequestByWorkOrder,
    RejectPartRequest,
    ApprovePartRequest
  ]
})

export class PartRequestModule { }