import { Carrier } from "src/domain/carrier/entities/Carrier";

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
