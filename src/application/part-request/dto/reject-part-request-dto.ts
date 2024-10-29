import { RequestStatus } from "@prisma/client";
import { TRequestStatus } from "src/core/enum/part-request";
import { IRejectPartRequest } from "src/shared/types/part-request/reject-part-request";

export class RejectPartRequestDTO {
  public partRequestId: string
  public rejectionReason: string | null
  public handleById: string
  public handleAt: Date
  public status: TRequestStatus

  constructor(rejectedPartRequest: IRejectPartRequest) {
    this.partRequestId = rejectedPartRequest.partRequestId
    this.rejectionReason = rejectedPartRequest.rejectionReason
    this.handleById = rejectedPartRequest.handleById
    this.handleAt = rejectedPartRequest.handleAt
    this.status = rejectedPartRequest.status
  }
}
