import { makeService } from '../../factories/serviceFactory';
import { ServiceRepositoryInMemory } from '../../repositories/serviceRepositoryInMemory';
import { DeleteService } from './deleteService';

let serviceRepositoryInMemory: ServiceRepositoryInMemory;
let deleteService: DeleteService;

describe('Delete Service', () => {
  beforeEach(() => {
    serviceRepositoryInMemory = new ServiceRepositoryInMemory();
    deleteService = new DeleteService(serviceRepositoryInMemory);
  });

  it('Should be able to delete service', async () => {
    const service = makeService({});

    serviceRepositoryInMemory.services = [service];

    expect(serviceRepositoryInMemory.services).toEqual([service]);

    await deleteService.execute({
      serviceId: service.id,
    });

    expect(serviceRepositoryInMemory.services).toHaveLength(0);
  });
});
