import { ServiceNotFoundExcetion } from "../../exceptions/serviceNotFoundException";
import { makeService } from "../../factories/serviceFactory";
import { ServiceRepositoryInMemory } from "../../repositories/serviceRepositoryInMemory";
import { GetService } from "./getService";

let serviceRepositoryInMemory: ServiceRepositoryInMemory;
let getService: GetService;

describe('Get Service', () => {
  beforeEach(() => {
    serviceRepositoryInMemory = new ServiceRepositoryInMemory();
    getService = new GetService(serviceRepositoryInMemory);
  });

  it('Should be able to get service', async () => {
    const service = makeService({});

    serviceRepositoryInMemory.services = [service];

    const result = await getService.execute({
      serviceId: service.id
    });

    expect(result).toEqual(service);
  });

  it('Should be able to throw erroe when not found service', async () => {
    
    expect(async () => {
      await getService.execute({
        serviceId: 'fakeId'
      });
    }).rejects.toThrow(ServiceNotFoundExcetion);

  });
});