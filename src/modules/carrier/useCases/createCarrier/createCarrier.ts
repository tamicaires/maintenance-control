import { Injectable } from '@nestjs/common';
import { CarrierRepository } from '../../repositories/CarrierRepository';
import { Carrier } from '../../entities/Carrier';
import { CarrierWithSameNameException } from '../../exceptions/CarrierWithSameNameException';
import { CompanyRepository } from 'src/modules/company/repositories/CompanyRepository';
import { CompanyNotFoundException } from 'src/modules/company/exceptions/CompanyNotFoundException';

interface CreateCarrierRequest {
  carrierName: string;
  managerName: string;
  managerPhone: string;
  companyId: string;
  isActive: boolean;
}

@Injectable()
export class CreateCarrier {
  constructor(
    private readonly carrierRepository: CarrierRepository,
    private readonly companyRepository: CompanyRepository,
  ) { }
  async execute(data: CreateCarrierRequest) {
    const company = await this.companyRepository.findById(data.companyId);
    if (!company) throw new CompanyNotFoundException();

    const carrierAlreadyExist = await this.carrierRepository.findOne(
      data.carrierName,
    );

    if (carrierAlreadyExist) throw new CarrierWithSameNameException();

    const carrier = new Carrier(data);

    await this.carrierRepository.create(carrier);

    return carrier;
  }
}
