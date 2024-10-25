import { Tire as TireRaw} from "@prisma/client";
import { Tire } from "src/core/domain/entities/tire";

export class PrismaTireMapper {
  static toPrisma(tire: Tire): TireRaw {
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
    };
  }

  static toDomain(tire: TireRaw): Tire {
    return new Tire({
      brand: tire.brand,
      serialNumber: tire.serialNumber,
      axleId: tire.axleId,
      status: tire.status,
      treadDepth: tire.treadDepth,
      treadPattern: tire.treadPattern,
      wearRating: tire.wearRating,
      fireNumber: tire.fireNumber,
      location: tire.location,
    }, tire.id);
  }

}