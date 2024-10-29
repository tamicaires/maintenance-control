import { TRequestStatus } from "src/core/enum/part-request";

export interface IRejectPartRequestInput {
  partRequestId: string;
  rejectionReason: string | null;
  handleById: string;
}

export interface IRejectPartRequest {
  partRequestId: string;
  rejectionReason: string | null;
  handleById: string;
  handleAt: Date;
  status: TRequestStatus;
}

