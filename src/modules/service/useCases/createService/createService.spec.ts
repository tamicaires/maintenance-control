import { ServiceCategory } from '../../enum/service-category.enum';
import { ServiceWithSameNameException } from '../../exceptions/serviceWithSameNameException';
import { makeService } from '../../factories/serviceFactory';
import { ServiceRepositoryInMemory } from '../../repositories/serviceRepositoryInMemory';
import { CreateService } from './createService';

let serviceRepositoryInMemory: ServiceRepositoryInMemory;
let createService: CreateService;

describe('Create Service', () => {
  beforeEach(() => {
    serviceRepositoryInMemory = new ServiceRepositoryInMemory();
    createService = new CreateService(serviceRepositoryInMemory);
  });

  it('Should be able to create service', async () => {
    expect(serviceRepositoryInMemory.services).toEqual([]);

    const service = await createService.execute({
      serviceName: 'Troca de Lona',
      serviceCategory: ServiceCategory.BRAKES,
    });

    expect(serviceRepositoryInMemory.services).toEqual([service]);
  });

  it('Should be able to throw error when service already exist', async () => {
    const service = makeService({ serviceName: 'Solda de roda' });

    serviceRepositoryInMemory.services = [service];

    expect(async () => {
      await createService.execute({
        serviceName: 'Solda de roda',
        serviceCategory: ServiceCategory.WELDING,
      });
    }).rejects.toThrow(ServiceWithSameNameException);
  });
});
