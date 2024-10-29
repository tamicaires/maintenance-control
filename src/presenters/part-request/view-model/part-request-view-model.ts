import { PartRequest } from "src/core/domain/entities/part-request";

export interface PartRequestWithRelationalInfo extends PartRequest {
  part: {
    id: string;
    name: string;
    partNumber: string;
    stockQuantity: number;
  };
  requestedBy: {
    id: string;
    name: string;
  };
  workOrder: {
    id: string,
    displayId: string
  } | null;
}

export class PartRequestViewModel {
  static toHttp(partRequest: PartRequest) {
    return {
      id: partRequest.id,
      partId: partRequest.partId,
      requestedById: partRequest.requestedById,
      requestedForEmployeeId: partRequest.requestedForEmployeeId,
      handledById: partRequest.handledById,
      quantity: partRequest.quantity,
      approvedQuantity: partRequest.approvedQuantity,
      status: partRequest.status,
      rejectionReason: partRequest.rejectionReason,
      requestedAt: partRequest.requestedAt,
      handledAt: partRequest.handledAt,
      deliveredAt: partRequest.deliveredAt,
      workOrderId: partRequest.workOrderId,
      updatedAt: partRequest.updatedAt,
    }
  }

  static toHttpWithRelationalInfo(partRequest: PartRequestWithRelationalInfo) {
    return {
      id: partRequest.id,
      part: {
        id: partRequest.part.id,
        name: partRequest.part.name,
        partNumber: partRequest.part.partNumber,
        stockQuantity: partRequest.part.stockQuantity,
      },
      requestedBy: {
        id: partRequest.requestedBy.id,
        name: partRequest.requestedBy.name,
      },
      requestedForEmployeeId: partRequest.requestedForEmployeeId,
      handledById: partRequest.handledById,
      quantity: partRequest.quantity,
      approvedQuantity: partRequest.approvedQuantity,
      status: partRequest.status,
      rejectionReason: partRequest.rejectionReason,
      requestedAt: partRequest.requestedAt,
      handledAt: partRequest.handledAt,
      deliveredAt: partRequest.deliveredAt,
      workOrder: {
        id: partRequest.workOrder?.id,
        displayId: partRequest.workOrder?.displayId
      },
      updatedAt: partRequest.updatedAt,
    }
  }
}