import { PartRequest } from "src/core/domain/entities/part-request";

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
      isRejected: partRequest.isRejected,
      rejectionReason: partRequest.rejectionReason,
      requestedAt: partRequest.requestedAt,
      approvedAt: partRequest.approvedAt,
      deliveredAt: partRequest.deliveredAt,
      workOrderId: partRequest.workOrderId,
      updatedAt: partRequest.updatedAt,
    }
  }
}