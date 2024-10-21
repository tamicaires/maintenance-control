import { makeService } from '../../factories/serviceFactory';
import { ServiceRepositoryInMemory } from '../../repositories/serviceRepositoryInMemory';
import { GetManyServices } from './getManyServices';

let serviceRepositoryInMemory: ServiceRepositoryInMemory;
let getManyServices: GetManyServices;

describe('Get Many Services', () => {
  beforeEach(() => {
    serviceRepositoryInMemory = new ServiceRepositoryInMemory();
    getManyServices = new GetManyServices(serviceRepositoryInMemory);
  });

  it('Should be able to get many services', async () => {
    const services = [...Array(10)].map(() => makeService({}));

    serviceRepositoryInMemory.services = services;

    const result = await getManyServices.execute({});

    expect(result).toEqual(services);
  });

  it('Should be ablet to control service per page', async () => {
    const services = [...new Array(10)].map(() => makeService({}));

    serviceRepositoryInMemory.services = services;

    const result = await getManyServices.execute({
      perPage: '8',
    });

    expect(result).toHaveLength(8);
  });

  it('Should be able to control service page', async () => {
    const services = [...new Array(10)].map((_, index) =>
      makeService({
        serviceName: index < 5 ? 'page 1' : 'page 2',
      }),
    );

    serviceRepositoryInMemory.services = services;

    const result = await getManyServices.execute({
      page: '2',
      perPage: '5',
    });

    expect(result[0].serviceName).toEqual('page 2');
  });

  it('Should be able to filter by service name', async () => {
    const services = [...new Array(10)].map((_, index) =>
      makeService({
        serviceName: index < 5 ? 'Troca Lona' : 'Alinhamento',
      }),
    );

    serviceRepositoryInMemory.services = services;

    const result = await getManyServices.execute({
      filter: 'Alin',
    });

    expect(result[0].serviceName).toEqual('Alinhamento');
  });
});
