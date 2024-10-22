import { Injectable } from '@nestjs/common';
import { FleetRepository } from '../../repositories/FleetRepository';
import { Fleet } from '../../entities/Fleet';
import { FleetAlreadyExistsException } from '../../exceptions/FleetAlreadyExistsExceptions';
import { CompanyInstance } from 'src/core/company/company-instance';

interface CreateFleetRequest {
  fleetNumber: string;
  plate: string;
  km: string;
  carrierId: string;
  isActive: boolean;
}

@Injectable()
export class CreateFleet {
  constructor(private fleetRepository: FleetRepository) { }

  async execute(companyInstance: CompanyInstance, data: CreateFleetRequest) {
    const fleetNumberExists = await this.fleetRepository.findByNumber(
      companyInstance,
      data.fleetNumber
    );
    if (fleetNumberExists) {
      throw new FleetAlreadyExistsException({
        fields: { fleetNumber: 'Número de frota já cadastrada no sistema' },
      });
    }

    const fleetPlateExists = await this.fleetRepository.findByPlate(
      companyInstance, 
      data.plate
    );
    if (fleetPlateExists) {
      throw new FleetAlreadyExistsException({
        fields: { plate: 'Placa já cadastrada no sistema' },
      });
    }

    const fleet = new Fleet(companyInstance.addCompanyFilter(data));

    await this.fleetRepository.create(fleet);

    return fleet;
  }
}
