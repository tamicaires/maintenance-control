import { Injectable } from '@nestjs/common';
import { CarrierRepository } from '../../repositories/CarrierRepository';
import { Carrier } from '../../entities/Carrier';
import { CarrierWithSameNameException } from '../../exceptions/CarrierWithSameNameException';
import { CompanyRepository } from 'src/domain/company/repositories/CompanyRepository';
import { CompanyNotFoundException } from 'src/domain/company/exceptions/CompanyNotFoundException';
import { CompanyInstance } from 'src/core/company/company-instance';

interface CreateCarrierRequest {
  carrierName: string;
  managerName: string;
  managerPhone: string;
  isActive: boolean;
}

@Injectable()
export class CreateCarrier {
  constructor(
    private readonly carrierRepository: CarrierRepository,
    private readonly companyRepository: CompanyRepository,
  ) { }
  async execute(companyInstance: CompanyInstance, data: CreateCarrierRequest) {
    const company = await this.companyRepository.findById(
      companyInstance,
    );
    if (!company) throw new CompanyNotFoundException();

    const carrierAlreadyExist = await this.carrierRepository.findOne(
      data.carrierName,
    );

    if (carrierAlreadyExist) throw new CarrierWithSameNameException();

    const carrier = new Carrier(
      companyInstance.addCompanyFilter(data)
    );
    console.log("carrier created", carrier);
    await this.carrierRepository.create(carrier);

    return carrier;
  }
}
