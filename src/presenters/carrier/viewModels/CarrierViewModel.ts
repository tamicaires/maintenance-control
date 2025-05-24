import { Carrier } from "src/core/domain/entities/carrier";

interface ICarrier {
  carrierName: string;
  managerName: string;
  managerPhone: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface ICarrierWithCount {
  carriers: ICarrier[];
  totalCount: number;
}

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

  static toHttpWithCount(data: ICarrierWithCount): ICarrierWithCount {
    const carriers = data.carriers.map(CarrierViewModel.toHttp);
    return {
      carriers: carriers,
      totalCount: data.totalCount,
    };
  }
}
