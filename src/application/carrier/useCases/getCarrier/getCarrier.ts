import { Injectable } from '@nestjs/common';
import { CarrierNotFoundException } from '../../exceptions/CarrierNotFoundException';
import { CarrierRepository } from 'src/core/domain/repositories/carrier-repository';

interface GetCarrierRequest {
  carrierId: string;
}

@Injectable()
export class GetCarrier {
  constructor(private carrierRepository: CarrierRepository) {}

  async execute({ carrierId }: GetCarrierRequest) {
    const carrier = await this.carrierRepository.findById(carrierId);

    if (!carrier) throw new CarrierNotFoundException();

    return carrier;
  }
}
