import { Vehicle } from "@prisma/client";

export class VehicleViewModel {
  static toHttp({
    id,
    plate,
    model,
    brand,
    year,
    createdAt,
    updatedAt,
  }: Vehicle) {
    return {
      id,
      plate,
      model,
      brand,
      year,
      createdAt,
      updatedAt,
    };
  }
}