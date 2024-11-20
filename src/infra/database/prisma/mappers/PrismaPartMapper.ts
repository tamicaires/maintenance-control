import { Part as PartRaw } from "@prisma/client";
import { Part } from "src/core/domain/entities/part";

export class PrismaPartMapper {
  static toPrisma(part: Part): PartRaw {
    return {
      id: part.id,
      name: part.name,
      description: part.description,
      partNumber: part.partNumber,
      serialNumber: part.serialNumber,
      model: part.model,
      brand: part.brand,
      supplier: part.supplier,
      costPrice: part.costPrice,
      sellingPrice: part.sellingPrice,
      stockQuantity: part.stockQuantity,
      location: part.location,
      status: part.status,
      categoryId: part.categoryId,
      companyId: part.companyId,
      createdAt: part.createdAt,
      updatedAt: part.updatedAt,
    }
  }

  static toDomain(part: PartRaw): Part {
    return new Part({
      name: part.name,
      description: part.description,
      partNumber: part.partNumber,
      serialNumber: part.serialNumber,
      model: part.model,
      brand: part.brand,
      supplier: part.supplier,
      costPrice: part.costPrice,
      sellingPrice: part.sellingPrice,
      stockQuantity: part.stockQuantity,
      location: part.location,
      status: part.status,
      categoryId: part.categoryId,
      companyId: part.companyId,
      createdAt: part.createdAt,
      updatedAt: part.updatedAt,
    }, part.id,);
  }
}