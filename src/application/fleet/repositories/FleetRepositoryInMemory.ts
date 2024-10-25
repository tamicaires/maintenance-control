import { CompanyInstance } from 'src/core/company/company-instance';
import { Fleet } from '../../../core/domain/entities/fleet';
import { FleetRepository } from '../../../core/domain/repositories/fleet-repository';

export class FleetRepositoryInMemory implements FleetRepository {
  findByPlate(companyInstance: CompanyInstance, plate: string): Promise<Fleet | null> {
    throw new Error('Method not implemented.');
  }
  findByNumber(companyInstance: CompanyInstance, fleetNumber: string): Promise<Fleet | null> {
    throw new Error('Method not implemented.');
  }
  public fleets: Fleet[] = [];

  async create(fleet: Fleet): Promise<void> {
    this.fleets.push(fleet);
  }

  async findById(id: string): Promise<Fleet | null> {
    const fleet = this.fleets.find((fleet) => fleet.id === id);

    if (!fleet) return null;

    return fleet;
  }

  async delete(id: string): Promise<void> {
    this.fleets = this.fleets.filter((fleet) => fleet.id === id);
  }

  async save(fleet: Fleet): Promise<void> {
    const fleetIndex = this.fleets.findIndex(
      (currentFleet) => currentFleet.id === fleet.id,
    );

    if (fleetIndex >= 0) this.fleets[fleetIndex] = fleet;
  }

  async findMany(page: number, perPage: number): Promise<Fleet[]> {
    return this.fleets.slice((page - 1) * perPage, page * perPage);
  }
}
