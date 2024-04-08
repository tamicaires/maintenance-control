import { Injectable } from '@nestjs/common';
import { FleetRepository } from '../../repositories/FleetRepository';
import { Fleet } from '../../entities/Fleet';
import { FleetStatus } from '../../enum/fleet-status.enum';

interface CreateFleetRequest {
  fleetNumber: string;
  plate: string;
  firstTrailerPlate: string;
  secondTrailerPlate: string;
  thirdTrailerPlate: string;
  km: string;
  carrierId: string;
  status: FleetStatus;
}

@Injectable()
export class CreateFleet {
  constructor(private fleetRepository: FleetRepository) {}

  async execute(data: CreateFleetRequest) {
    const fleet = new Fleet({
      fleetNumber: data.fleetNumber,
      plate: data.plate,
      firstTrailerPlate: data.firstTrailerPlate,
      secondTrailerPlate: data.secondTrailerPlate,
      thirdTrailerPlate: data.thirdTrailerPlate,
      km: data.km,
      carrierId: data.carrierId,
      status: data.status
    });

    await this.fleetRepository.create(fleet);

    return fleet;
  };
};
