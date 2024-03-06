import { ServiceAssignmentNotFoundException } from "../../exceptions/serviceAssignmentNotFoundException";
import { makeServiceAssignment } from "../../factories/serviceAssignmentFactory";
import { ServiceAssignmentRepositoryInMemory } from "../../repositories/serviceAssignmentRepositoryInMemory";
import { GetServiceAssignment } from "./getServiceAssignment";

let serviceAssignmentRepositoryInMemory: ServiceAssignmentRepositoryInMemory;
let getServiceAssignment: GetServiceAssignment;

describe('Get Service Assignment', () => {
  beforeEach(() => {
    serviceAssignmentRepositoryInMemory = new ServiceAssignmentRepositoryInMemory();
    getServiceAssignment = new GetServiceAssignment(serviceAssignmentRepositoryInMemory);
  });

  it('Should be able to get service assignment', async () => {
    const serviceAssignment = makeServiceAssignment({});

    serviceAssignmentRepositoryInMemory.serviceAssignments = [serviceAssignment];

    const result = await getServiceAssignment.execute({
      serviceAssignmentId: serviceAssignment.id
    });

    expect(serviceAssignmentRepositoryInMemory.serviceAssignments).toEqual([result]);
  });

  it('Should be able to throw error when not found service assignment', async () => {
    expect(serviceAssignmentRepositoryInMemory.serviceAssignments).toHaveLength(0);
    
    expect(async () => {
      await getServiceAssignment.execute({
        serviceAssignmentId: 'fakeId'
      });
    }).rejects.toThrow(ServiceAssignmentNotFoundException);
  });
});