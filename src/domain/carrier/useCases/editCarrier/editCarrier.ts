import { Injectable } from '@nestjs/common';
import { CarrierRepository } from '../../repositories/CarrierRepository';
import { CarrierStatus } from '../../enum/carrier-status.enum';
import { updateCarrierProperties } from 'src/shared/utils/carrierUtils';
import { CarrierNotFoundException } from '../../exceptions/CarrierNotFoundException';

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
