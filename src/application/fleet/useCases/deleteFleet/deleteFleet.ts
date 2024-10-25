import { Injectable } from '@nestjs/common';
import { FleetRepository } from '../../../../core/domain/repositories/fleet-repository';
import { FleetNotFoundException } from '../../exceptions/FleetNotFoundException';

interface DeleteFleetRequest {
  fleetId: string;
}

@Injectable()
export class DeleteFleet {
  constructor(private fleetRepository: FleetRepository) {}

  async execute({ fleetId }: DeleteFleetRequest) {
    const fleet = await this.fleetRepository.findById(fleetId);

    if (!fleet) throw new FleetNotFoundException();

    await this.fleetRepository.delete(fleetId);
  }
}
