import { Injectable } from '@nestjs/common';
import { FleetRepository } from '../../../../core/domain/repositories/fleet-repository';
import { FleetNotFoundException } from '../../exceptions/FleetNotFoundException';

interface GetFleetRequest {
  fleetId: string;
}

@Injectable()
export class GetFleet {
  constructor(private fleetRepository: FleetRepository) {}

  async execute({ fleetId }: GetFleetRequest) {
    const fleet = await this.fleetRepository.findById(fleetId);

    if (!fleet) throw new FleetNotFoundException();

    return fleet;
  }
}
