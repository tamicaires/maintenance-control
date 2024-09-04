import { makeWorkOrder } from '../../factories/workOrderFactory';
import { WorkOrderRepositoryInMemory } from '../../repositories/workOrderRepositoryInMemory';
import { GetManyWorkOrders } from './getManyWorkOrders';

let workOrderRepositoryInMemory: WorkOrderRepositoryInMemory;
let getManyWorkOrders: GetManyWorkOrders;

describe('Get Many Work Orders', () => {
  beforeEach(() => {
    workOrderRepositoryInMemory = new WorkOrderRepositoryInMemory();
    getManyWorkOrders = new GetManyWorkOrders(workOrderRepositoryInMemory);
  });

  it('Should be able to get many orders', async () => {
    const workOrders = [...new Array(10)].map(() => makeWorkOrder({}));

    workOrderRepositoryInMemory.workOrders = workOrders;

    const result = await getManyWorkOrders.execute({});

    expect(result).toHaveLength(10);
  });

  it('Should be able to control work order per page', async () => {
    const workOrders = [...new Array(10)].map(() => makeWorkOrder({}));

    workOrderRepositoryInMemory.workOrders = workOrders;

    expect(workOrderRepositoryInMemory.workOrders).toEqual(workOrders);

    const result = await getManyWorkOrders.execute({
      perPage: '8',
    });

    expect(result).toHaveLength(8);
  });

  it('Should be able to control work order page', async () => {
    const workOrders = [...new Array(10)].map((_, index) =>
      makeWorkOrder({
        severityLevel: index < 5 ? 'page 1' : 'page 2',
      }),
    );

    workOrderRepositoryInMemory.workOrders = workOrders;

    const result = await getManyWorkOrders.execute({
      page: '1',
      perPage: '5',
    });

    expect(result[0].severityLevel).toEqual('page 1');
  });
});
