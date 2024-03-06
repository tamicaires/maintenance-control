import { ServiceAssignmentNotFoundException } from "../../exceptions/serviceAssignmentNotFoundException";
import { makeServiceAssignment } from "../../factories/serviceAssignmentFactory";
import { ServiceAssignmentRepositoryInMemory } from "../../repositories/serviceAssignmentRepositoryInMemory";
import { UpdateServiceAssignment } from "./updateServiceAssignment";

let serviceAssignmentRepositoryInMemory: ServiceAssignmentRepositoryInMemory;
let updateServiceAssignment: UpdateServiceAssignment

describe('Update Service Assignment', () => {
  beforeEach(() => {
    serviceAssignmentRepositoryInMemory = new ServiceAssignmentRepositoryInMemory();
    updateServiceAssignment = new UpdateServiceAssignment(
      serviceAssignmentRepositoryInMemory
    );
  });

  it('Should be able to update service assignment', async () => {
    const serviceAssignment = makeServiceAssignment({});

    serviceAssignmentRepositoryInMemory.serviceAssignments = [serviceAssignment];

    const result = await updateServiceAssignment.execute({
      serviceAssignmentId: serviceAssignment.id,
      workOrderId: 'NewWorkOrderId'
    });

    expect(serviceAssignmentRepositoryInMemory.serviceAssignments[0].workOrderId)
      .toEqual(result.workOrderId);
  });

  it('Should be able to throw error when not found service assignment', async () => {

    expect(async () => {
      await updateServiceAssignment.execute({
        serviceAssignmentId: 'fakeId'
      });
    }).rejects.toThrow(ServiceAssignmentNotFoundException)
  });
});