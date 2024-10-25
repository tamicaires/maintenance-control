import { Injectable } from '@nestjs/common';
import { updateCarrierProperties } from 'src/shared/utils/carrierUtils';
import { CarrierNotFoundException } from '../../exceptions/CarrierNotFoundException';
import { CarrierRepository } from 'src/core/domain/repositories/carrier-repository';

interface EditCarrierRequest {
  carrierName?: string;
  managerName?: string;
  managerPhone?: string;
  companyId?: string;
  isActive?: boolean;
  carrierId: string;
}

@Injectable()
export class EditCarrier {
  constructor(private carrierRepository: CarrierRepository) {}

  async execute(data: EditCarrierRequest) {
    const carrier = await this.carrierRepository.findById(data.carrierId);

    if (!carrier) throw new CarrierNotFoundException();

    updateCarrierProperties(carrier, data);

    await this.carrierRepository.save(carrier);

    return carrier;
  }
}
