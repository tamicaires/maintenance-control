import { Part } from "src/core/domain/entities/part";

export function updatePartProperties(part: Part, data: Partial<Part>) {
  if (data.name !== undefined) {
    part.name = data.name;
  }

  if (data.description !== undefined) {
    part.description = data.description;
  }

  if (data.partNumber !== undefined) {
    part.partNumber = data.partNumber;
  }

  if (data.model !== undefined) {
    part.model = data.model;
  }

  if (data.brand !== undefined) {
    part.brand = data.brand;
  }

  if (data.supplier !== undefined) {
    part.supplier = data.supplier;
  }

  if (data.costPrice !== undefined) {
    part.costPrice = data.costPrice;
  }

  if (data.sellingPrice !== undefined) {
    part.sellingPrice = data.sellingPrice;
  }

  if (data.stockQuantity !== undefined) {
    part.stockQuantity = data.stockQuantity;
  }

  if (data.location !== undefined) {
    part.location = data.location;
  }

  if (data.status !== undefined) {
    part.status = data.status;
  }

  if (data.categoryId !== undefined) {
    part.categoryId = data.categoryId;
  }

  if (data.trailerId !== undefined) {
    part.trailerId = data.trailerId;
  }

  if (data.axleId !== undefined) {
    part.axleId = data.axleId;
  }

  if (data.updatedAt !== undefined) {
    part.updatedAt = data.updatedAt;
  }
}
