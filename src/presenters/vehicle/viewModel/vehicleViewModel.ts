import { Vehicle } from "@prisma/client";

export class VehicleViewModel {
  static toHttp({
    id,
    plate,
    model,
    brand,
    year,
    color,
    isActive,
    km,
    power,
    companyId,
    fleetId,
    createdAt,
    updatedAt,
  }: Vehicle) {
    return {
      id,
      plate,
      model,
      brand,
      year,
      color,
      isActive,
      km,
      power,
      companyId,
      fleetId,
      createdAt,
      updatedAt,
    };
  }
}