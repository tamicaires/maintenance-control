import { Injectable } from '@nestjs/common';
import { Carrier } from '../../../../core/domain/entities/carrier';
import { CarrierWithSameNameException } from '../../exceptions/CarrierWithSameNameException';
import { CompanyInstance } from 'src/core/company/company-instance';
import { CompanyNotFoundException } from 'src/application/company/exceptions/CompanyNotFoundException';
import { CarrierRepository } from 'src/core/domain/repositories/carrier-repository';
import { CompanyRepository } from 'src/core/domain/repositories/company-repository';

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
