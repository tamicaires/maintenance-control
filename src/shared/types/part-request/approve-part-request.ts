import { TRequestStatus } from "src/core/enum/part-request";

export interface IApprovePartRequestInput {
  partRequestId: string;
  handleById: string;
  approvedQuantity: number;
}

export interface IApprovePartRequest {
  partRequestId: string;
  partId: string;
  handleById: string;
  approvedQuantity: number;
  stockQuantity: number;
  handleAt: Date;
  status: TRequestStatus;
}