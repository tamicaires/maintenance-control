import { Tire } from "src/core/domain/entities/tire";


export function updateTireProperties(tire: Tire, data: Partial<Tire>) {
  if (data.brand !== undefined) {
    tire.brand = data.brand;
  }

  if (data.serialNumber !== undefined) {
    tire.serialNumber = data.serialNumber;
  }

  if (data.axleId !== undefined) {
    tire.axleId = data.axleId;
  }

  if (data.status !== undefined) {
    tire.status = data.status;
  }

  if (data.treadDepth !== undefined) {
    tire.treadDepth = data.treadDepth;
  }

  if (data.treadPattern !== undefined) {
    tire.treadPattern = data.treadPattern;
  }

  if (data.wearRating !== undefined) {
    tire.wearRating = data.wearRating;
  }

  if (data.fireNumber !== undefined) {
    tire.fireNumber = data.fireNumber;
  }

  if (data.location !== undefined) {
    tire.location = data.location;
  }

  if (data.updatedAt !== undefined) {
    tire.updatedAt = data.updatedAt;
  }
}
