import { TRequestStatus } from "src/core/enum/part-request";
import { IApprovePartRequest } from "src/shared/types/part-request/approve-part-request";

export class ApprovePartRequestDTO {
  partRequestId: string;
  partId: string;
  handleById: string;
  handleAt: Date;
  status: TRequestStatus;
  approvedQuantity: number;
  stockQuantity: number;

  constructor(data: IApprovePartRequest) {
    this.partRequestId = data.partRequestId;
    this.partId = data.partId;
    this.handleById = data.handleById;
    this.handleAt = data.handleAt;
    this.status = data.status;
    this.approvedQuantity = data.approvedQuantity;
    this.stockQuantity = data.stockQuantity;
  }
}