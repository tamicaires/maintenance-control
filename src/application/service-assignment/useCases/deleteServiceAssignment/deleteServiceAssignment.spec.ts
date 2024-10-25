import { ServiceAssignmentNotFoundException } from '../../exceptions/serviceAssignmentNotFoundException';
import { makeServiceAssignment } from '../../factories/serviceAssignmentFactory';
import { ServiceAssignmentRepositoryInMemory } from '../../repositories/serviceAssignmentRepositoryInMemory';
import { DeleteServiceAssignment } from './deleteServiceAssignment';

let serviceAssignmentRepositoryInMemory: ServiceAssignmentRepositoryInMemory;
let deleteServiceAssignment: DeleteServiceAssignment;

describe('Delete Service Assignment', () => {
  beforeEach(() => {
    serviceAssignmentRepositoryInMemory =
      new ServiceAssignmentRepositoryInMemory();
    deleteServiceAssignment = new DeleteServiceAssignment(
      serviceAssignmentRepositoryInMemory,
    );
  });

  it('Should be able to delete service assignment', async () => {
    const serviceAssignment = makeServiceAssignment({});

    serviceAssignmentRepositoryInMemory.serviceAssignments = [
      serviceAssignment,
    ];

    expect(serviceAssignmentRepositoryInMemory.serviceAssignments).toEqual([
      serviceAssignment,
    ]);

    await deleteServiceAssignment.execute({
      serviceAssignmentId: serviceAssignment.id,
    });

    expect(serviceAssignmentRepositoryInMemory.serviceAssignments).toHaveLength(
      0,
    );
  });

  it('Should be able to throw error when not found service assignment', async () => {
    expect(async () => {
      await deleteServiceAssignment.execute({
        serviceAssignmentId: 'fakeId',
      });
    }).rejects.toThrow(ServiceAssignmentNotFoundException);
  });
});
