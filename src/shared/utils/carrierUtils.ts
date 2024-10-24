import { Carrier } from "src/domain/carrier/entities/Carrier";

export function updateCarrierProperties(
  carrier: Carrier,
  data: Partial<Carrier>,
) {
  if (data.carrierName !== undefined) {
    carrier.carrierName = data.carrierName;
  }

  if (data.managerName !== undefined) {
    carrier.managerName = data.managerName;
  }

  if (data.managerPhone !== undefined) {
    carrier.managerPhone = data.managerPhone;
  }

  if (data.isActive !== undefined) {
    carrier.isActive = data.isActive;
  }
}
