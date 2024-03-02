import { ServiceCategory } from "../../enum/service-category.enum";
import { ServiceRepositoryInMemory } from "../../repositories/serviceRepositoryInMemory";
import { CreateService } from "./createService";

let serviceRepositoryInMemory: ServiceRepositoryInMemory
let createService: CreateService

describe('Create Service', () => {
  beforeEach(() => {
    serviceRepositoryInMemory = new ServiceRepositoryInMemory()
    createService = new CreateService(serviceRepositoryInMemory);
  });

  it('Should be able to create service', async () => {
    expect(serviceRepositoryInMemory.services).toEqual([]);

    const service = await createService.execute({
      serviceName: 'Troca de Lona',
      serviceCategory: ServiceCategory.Pneumatic
    });

    expect(serviceRepositoryInMemory.services).toEqual([service])
  });
});