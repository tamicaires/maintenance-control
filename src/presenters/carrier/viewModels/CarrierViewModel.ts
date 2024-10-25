import { Carrier } from "src/core/domain/entities/carrier";

export class CarrierViewModel {
  static toHttp({
    id,
    carrierName,
    managerName,
    managerPhone,
    isActive,
    createdAt,
    updatedAt,
  }: Carrier) {
    return {
      id,
      carrierName,
      managerName,
      managerPhone,
      isActive,
      createdAt,
      updatedAt,
    };
  }
}
