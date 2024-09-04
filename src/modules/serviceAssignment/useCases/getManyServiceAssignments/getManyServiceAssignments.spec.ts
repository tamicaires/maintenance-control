import { makeServiceAssignment } from '../../factories/serviceAssignmentFactory';
import { ServiceAssignmentRepositoryInMemory } from '../../repositories/serviceAssignmentRepositoryInMemory';
import { GetManyServiceAssignments } from './getManyServiceAssignments';

let serviceAssignmentRepositoryInMemory: ServiceAssignmentRepositoryInMemory;
let getManyServiceAssignments: GetManyServiceAssignments;

describe('Get Many Service Assignments', () => {
  beforeEach(() => {
    serviceAssignmentRepositoryInMemory =
      new ServiceAssignmentRepositoryInMemory();
    getManyServiceAssignments = new GetManyServiceAssignments(
      serviceAssignmentRepositoryInMemory,
    );
  });

  it('Should be able to get many service assignments', async () => {
    const serviceAssignments = [...new Array(10)].map(() =>
      makeServiceAssignment({}),
    );

    serviceAssignmentRepositoryInMemory.serviceAssignments = serviceAssignments;

    const result = await getManyServiceAssignments.execute({});

    expect(result).toHaveLength(10);
  });

  it('Should be able to control per page service assignments', async () => {
    const serviceAssignments = [...new Array(10)].map(() =>
      makeServiceAssignment({}),
    );

    serviceAssignmentRepositoryInMemory.serviceAssignments = serviceAssignments;

    const result = await getManyServiceAssignments.execute({
      perPage: '5',
    });

    expect(result).toHaveLength(5);
  });

  it('Should be able to control page service assignments', async () => {
    const serviceAssignments = [...new Array(10)].map((_, index) =>
      makeServiceAssignment({
        employeeId: index < 5 ? 'page 1' : 'page 2',
      }),
    );

    serviceAssignmentRepositoryInMemory.serviceAssignments = serviceAssignments;

    const resut = await getManyServiceAssignments.execute({
      page: '2',
      perPage: '5',
    });

    expect(resut[0].employeeId).toEqual('page 2');
  });
});
