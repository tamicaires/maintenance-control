import { Injectable } from '@nestjs/common';
import { CarrierNotFoundException } from '../../exceptions/CarrierNotFoundException';
import { CarrierRepository } from 'src/core/domain/repositories/carrier-repository';

interface DeleteCarrierRequest {
  carrierId: string;
}

@Injectable()
export class DeleteCarrier {
  constructor(private carrierRepository: CarrierRepository) {}

  async execute({ carrierId }: DeleteCarrierRequest) {
    const carrier = await this.carrierRepository.findById(carrierId);

    if (!carrier) throw new CarrierNotFoundException();

    await this.carrierRepository.delete(carrierId);
  }
}
