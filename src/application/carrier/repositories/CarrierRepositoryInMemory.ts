import { CompanyInstance } from 'src/core/company/company-instance';
import { Carrier } from '../../../core/domain/entities/carrier';
import { CarrierRepository } from 'src/core/domain/repositories/carrier-repository';

export class CarrierRepositoryInMemory implements CarrierRepository {
  public carriers: Carrier[] = [];

  async create(carrier: Carrier): Promise<void> {
    this.carriers.push(carrier);
  }

  async findById(id: string): Promise<Carrier | null> {
    const carrier = await this.carriers.find((carrier) => carrier.id === id);

    if (!carrier) return null;

    return carrier;
  }

  async delete(id: string): Promise<void> {
    this.carriers = this.carriers.filter((carrier) => carrier.id !== id);
  }

  async save(carrier: Carrier): Promise<void> {
    const carrierIndex = this.carriers.findIndex(
      (currentCarrier) => currentCarrier.id === carrier.id,
    );

    if (carrierIndex >= 0) this.carriers[carrierIndex] = carrier;
  }

  async findMany(companyInstance: CompanyInstance, page: number, perPage: number): Promise<Carrier[] | null> {
    return this.carriers.slice((page - 1) * perPage, page * perPage);
  }

  async findOne(carrierName: string): Promise<Carrier | null> {
    const carrier = await this.carriers.find(
      (carrier) => carrier.carrierName === carrierName,
    );

    if (!carrier) return null;

    return carrier;
  }
}
