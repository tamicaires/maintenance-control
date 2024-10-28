import { PartRequest as PartRequestRaw } from "@prisma/client";
import { PartRequest } from "src/core/domain/entities/part-request";

export class PrismaPartRequestMapper {
  static toDomain(partRequest: PartRequestRaw): PartRequest {
    return new PartRequest({
      partId: partRequest.partId,
      requestedForEmployeeId: partRequest.requestedForEmployeeId,
      handledById: partRequest.handledById,
      quantity: partRequest.quantity,
      approvedQuantity: partRequest.approvedQuantity,
      status: partRequest.status,
      isRejected: partRequest.isRejected,
      requestedAt: partRequest.requestedAt,
      workOrderId: partRequest.workOrderId,
      requestedById: partRequest.requestedById,
      approvedAt: partRequest.approvedAt,
      deliveredAt: partRequest.deliveredAt,
      rejectionReason: partRequest.rejectionReason,
      updatedAt: partRequest.updatedAt,
    }, partRequest.id)
  }

  static toPrisma(partRequest: PartRequest): PartRequestRaw {
    return {
      id: partRequest.id,
      partId: partRequest.partId,
      requestedForEmployeeId: partRequest.requestedForEmployeeId,
      handledById: partRequest.handledById,
      quantity: partRequest.quantity,
      approvedQuantity: partRequest.approvedQuantity,
      status: partRequest.status,
      isRejected: partRequest.isRejected,
      requestedAt: partRequest.requestedAt,
      workOrderId: partRequest.workOrderId,
      approvedAt: partRequest.approvedAt,
      deliveredAt: partRequest.deliveredAt,
      rejectionReason: partRequest.rejectionReason,
      requestedById: partRequest.requestedById,
      updatedAt: partRequest.updatedAt,
    };
  }
}