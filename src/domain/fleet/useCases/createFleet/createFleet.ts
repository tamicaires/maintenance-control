import { Injectable } from '@nestjs/common';
import { FleetRepository } from '../../repositories/FleetRepository';
import { Fleet } from '../../entities/Fleet';

interface CreateFleetRequest {
  fleetNumber: string;
  plate: string;
  km: string;
  carrierId: string;
  companyId: string;
  isActive: boolean;
}

@Injectable()
export class CreateFleet {
  constructor(private fleetRepository: FleetRepository) { }

  async execute(data: CreateFleetRequest) {
    const fleet = new Fleet({
      fleetNumber: data.fleetNumber,
      plate: data.plate,
      km: data.km,
      carrierId: data.carrierId,
      isActive: data.isActive,
      companyId: data.companyId,
    });

    await this.fleetRepository.create(fleet);

    return fleet;
  }
}
