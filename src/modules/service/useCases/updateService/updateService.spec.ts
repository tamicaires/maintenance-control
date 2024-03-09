import { ServiceNotFoundExcetion } from "../../exceptions/serviceNotFoundException";
import { makeService } from "../../factories/serviceFactory";
import { ServiceRepositoryInMemory } from "../../repositories/serviceRepositoryInMemory";
import { UpdateService } from "./updateService";

let serviceRepositoryInMemory: ServiceRepositoryInMemory;
let updateService: UpdateService;

describe('Update Service', () =>{
  beforeEach(() => {  
    serviceRepositoryInMemory = new ServiceRepositoryInMemory()
    updateService = new UpdateService(serviceRepositoryInMemory);
  });

  it('Should be able to update service', async () => {
    const service = makeService({});

    serviceRepositoryInMemory.services = [service];

    const serviceNameChanged = 'Alinhamento';

    const result = await updateService.execute({
      serviceId: service.id,
      serviceName: serviceNameChanged
    });

    expect(serviceRepositoryInMemory.services[0].serviceName).toEqual(result.serviceName);
  });

  it('Should be ablet to throw error when not found service', async () => {

    expect(async () => {
      await updateService.execute({
        serviceId: 'fakeId'
      });
    }).rejects.toThrow(ServiceNotFoundExcetion);
  });
});