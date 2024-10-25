import { Carrier as CarrierRaw } from '@prisma/client';
import { Carrier } from "src/core/domain/entities/carrier";

export class PrismaCarrierMapper {
  static toPrisma({
    id,
    carrierName,
    managerName,
    managerPhone,
    companyId,
    isActive,
    createdAt,
    updatedAt,
  }: Carrier): CarrierRaw {
    return {
      id,
      carrierName,
      managerName,
      managerPhone,
      companyId,
      isActive,
      createdAt,
      updatedAt,
    };
  }

  static toDomain({
    id,
    carrierName,
    managerName,
    managerPhone,
    companyId,
    isActive,
    createdAt,
    updatedAt,
  }: CarrierRaw): Carrier {
    return new Carrier(
      {
        carrierName,
        managerName,
        managerPhone,
        companyId,
        isActive,
        createdAt,
        updatedAt,
      },
      id,
    );
  }
}
