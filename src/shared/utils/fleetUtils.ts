import { EditFleetBody } from 'src/application/fleet/dtos/editFleetBody';
import { Fleet } from 'src/domain/fleet/entities/Fleet';

export function updateFleetProperties(fleet: Fleet, data: Partial<Fleet>) {
  if (data.fleetNumber !== undefined) {
    fleet.fleetNumber = data.fleetNumber;
  }

  if (data.isActive !== undefined) {
    fleet.isActive = data.isActive;

  }
  if (data.carrierId !== undefined) {
    fleet.carrierId = data.carrierId;
  }
}

export function mapEditFleetData(body: EditFleetBody, fleetId: string) {
  const { fleetNumber, isActive, carrierId } = body;

  return {
    fleetId,
    carrierId,
    fleetNumber,
    isActive,
  };
}
