import { EditFleetBody } from 'src/infra/http/modules/fleet/dtos/editFleetBody';
import { Fleet } from 'src/modules/fleet/entities/Fleet';

export function updateFleetProperties(fleet: Fleet, data: Partial<Fleet>) {
  if (data.fleetNumber !== undefined) {
    fleet.fleetNumber = data.fleetNumber;
  }
  if (data.plate !== undefined) {
    fleet.plate = data.plate;
  }
  if (data.firstTrailerPlate !== undefined) {
    fleet.firstTrailerPlate = data.firstTrailerPlate;
  }
  if (data.secondTrailerPlate !== undefined) {
    fleet.secondTrailerPlate = data.secondTrailerPlate;
  }
  if (data.thirdTrailerPlate !== undefined) {
    fleet.thirdTrailerPlate = data.thirdTrailerPlate;
  }
  if (data.km !== undefined) {
    fleet.km = data.km;
  }
  if (data.isActive !== undefined) {
    fleet.isActive = data.isActive;
  }
}

export function mapEditFleetData(body: EditFleetBody, fleetId: string) {
  const {
    fleetNumber,
    plate,
    firstTrailerPlate,
    secondTrailerPlate,
    thirdTrailerPlate,
    km,
    isActive,
  } = body;

  return {
    fleetId,
    fleetNumber,
    plate,
    firstTrailerPlate,
    secondTrailerPlate,
    thirdTrailerPlate,
    km,
    isActive,
  };
}
