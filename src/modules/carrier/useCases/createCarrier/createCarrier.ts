import { Injectable } from '@nestjs/common';
import { CarrierRepository } from '../../repositories/CarrierRepository';
import { Carrier } from '../../entities/Carrier';
import { CarrierWithSameNameException } from '../../exceptions/CarrierWithSameNameException';

interface CreateCarrierRequest {
  carrierName: string;
  managerName: string;
  managerPhone: string;
  isActive: boolean;
}

@Injectable()
export class CreateCarrier {
  constructor(private carrierRepository: CarrierRepository) {}
  async execute(data: CreateCarrierRequest) {
    const carrierAlreadyExist = await this.carrierRepository.findOne(
      data.carrierName,
    );

    if (carrierAlreadyExist) throw new CarrierWithSameNameException();

    const carrier = new Carrier(data);

    await this.carrierRepository.create(carrier);

    return carrier;
  }
}
