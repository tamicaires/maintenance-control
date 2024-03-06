import { ServiceAssignmentRepositoryInMemory } from "../../repositories/serviceAssignmentRepositoryInMemory";
import { CreateServiceAssignment } from "./createServiceAssignment";


let serviceAssignmentRepositoryInMemory: ServiceAssignmentRepositoryInMemory;
let createServiceAssignment: CreateServiceAssignment;

describe('Create Service Assignment', () => {
  beforeEach(() => {
    serviceAssignmentRepositoryInMemory = new ServiceAssignmentRepositoryInMemory();
    createServiceAssignment = new CreateServiceAssignment(serviceAssignmentRepositoryInMemory);
  });

  it('Should be able to create service Assignment', async () => {
    expect(serviceAssignmentRepositoryInMemory.serviceAssignments).toEqual([]);

    const serviceAssignment = await createServiceAssignment.execute({
      employeeId: '123456',
      serviceId: '1234567',
      workOrderId: '12345678'
    });

    expect(serviceAssignmentRepositoryInMemory.serviceAssignments)
      .toEqual([serviceAssignment]);
  });
});