import { Injectable } from "@nestjs/common";
import { FleetStatus } from "../../enum/fleet-status.enum";
import { FleetRepository } from "../../repositories/FleetRepository";
import { updateFleetProperties } from "src/utils/fleetUtils";
import { FleetNotFoundException } from "../../exceptions/FleetNotFoundException";

interface EditFleetRequest {
  fleetId: string;
  fleetNumber?: string;
  plate?: string;
  firstTrailerPlate?: string;
  secondTrailerPlate?: string;
  thirdTrailerPlate?: string;
  km?: string;
  status?: FleetStatus;
}

@Injectable()
export class EditFleet {
  constructor(private fleetRepository: FleetRepository) {}

  async execute(data: EditFleetRequest) {
    const fleet = await this.fleetRepository.findById(data.fleetId);

    if(!fleet) throw new FleetNotFoundException();

    updateFleetProperties(fleet, data);

    await this.fleetRepository.save(fleet);

    return fleet;
  }
};


