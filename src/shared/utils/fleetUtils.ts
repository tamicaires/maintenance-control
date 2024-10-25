import { Fleet } from 'src/core/domain/entities/fleet';
import { EditFleetBody } from 'src/presenters/fleet/dtos/editFleetBody';

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
