import { Part } from "src/domain/part/entities/Part";

export class PartViewModel {
  static toHttp(part: Part) {
    return {
      id: part.id,
      name: part.name,
      description: part.description,
      partNumber: part.partNumber,
      model: part.model,
      brand: part.brand,
      supplier: part.supplier,
      costPrice: part.costPrice,
      sellingPrice: part.sellingPrice,
      stockQuantity: part.stockQuantity,
      location: part.location,
      status: part.status,
      categoryId: part.categoryId,
      trailerId: part.trailerId,
      axleId: part.axleId,
      createdAt: part.createdAt,
      updatedAt: part.updatedAt,
    }
  }
}