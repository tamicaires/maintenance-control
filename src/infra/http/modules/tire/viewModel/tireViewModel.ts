import { Tire } from "src/modules/tire/entities/Tire";

export class TireViewModel {
  static toHttp(tire: Tire) {
    return {
      id: tire.id,
      brand: tire.brand,
      serialNumber: tire.serialNumber,
      axleId: tire.axleId,
      status: tire.status,
      treadDepth: tire.treadDepth,
      treadPattern: tire.treadPattern,
      wearRating: tire.wearRating,
      fireNumber: tire.fireNumber,
      location: tire.location,
      createdAt: tire.createdAt,
      updatedAt: tire.updatedAt,
    }
  }
}