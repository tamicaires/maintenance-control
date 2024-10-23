import { Injectable } from '@nestjs/common';
import { FleetRepository } from '../../repositories/FleetRepository';
import { updateFleetProperties } from 'src/shared/utils/fleetUtils';
import { FleetNotFoundException } from '../../exceptions/FleetNotFoundException';

interface EditFleetRequest {
  fleetId: string;
  carrierId: string;
  fleetNumber?: string;
  isActive?: boolean;
}

@Injectable()
export class EditFleet {
  constructor(private fleetRepository: FleetRepository) {}

  async execute(data: EditFleetRequest) {
    const fleet = await this.fleetRepository.findById(data.fleetId);

    if (!fleet) throw new FleetNotFoundException();

    updateFleetProperties(fleet, data);

    await this.fleetRepository.save(fleet);

    return fleet;
  }
}
