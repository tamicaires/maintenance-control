import { Fleet } from 'src/domain/fleet/entities/Fleet';
import { EditFleetBody } from 'src/infra/http/modules/fleet/dtos/editFleetBody';

export function updateFleetProperties(fleet: Fleet, data: Partial<Fleet>) {
  if (data.fleetNumber !== undefined) {
    fleet.fleetNumber = data.fleetNumber;
  }
  if (data.plate !== undefined) {
    fleet.plate = data.plate;
  }

  if (data.km !== undefined) {
    fleet.km = data.km;
  }
  if (data.isActive !== undefined) {
    fleet.isActive = data.isActive;
  }
}

export function mapEditFleetData(body: EditFleetBody, fleetId: string) {
  const { fleetNumber, plate, km, isActive } = body;

  return {
    fleetId,
    fleetNumber,
    plate,
    km,
    isActive,
  };
}
