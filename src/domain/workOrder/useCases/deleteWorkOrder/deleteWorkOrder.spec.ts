import { WorkOrderNotFoundException } from '../../exceptions/workOrderNotFoundException';
import { makeWorkOrder } from '../../factories/workOrderFactory';
import { WorkOrderRepositoryInMemory } from '../../repositories/workOrderRepositoryInMemory';
import { DeleteWorkOrder } from './deleteWorkOrder';

let workOrderRepositoryInMemory: WorkOrderRepositoryInMemory;
let deleteWorkOrder: DeleteWorkOrder;

describe('Delete Work Order', () => {
  beforeEach(() => {
    workOrderRepositoryInMemory = new WorkOrderRepositoryInMemory();
    deleteWorkOrder = new DeleteWorkOrder(workOrderRepositoryInMemory);
  });

  it('Should be able to delete work order', async () => {
    const workOrder = makeWorkOrder({});

    workOrderRepositoryInMemory.workOrders = [workOrder];

    expect(workOrderRepositoryInMemory.workOrders).toEqual([workOrder]);

    await deleteWorkOrder.execute({
      workOrderId: workOrder.id,
    });

    expect(workOrderRepositoryInMemory.workOrders).toHaveLength(0);
  });

  it('Should be able to throw error when not find work order', async () => {
    expect(async () => {
      await deleteWorkOrder.execute({
        workOrderId: 'fakeId',
      });
    }).rejects.toThrow(WorkOrderNotFoundException);
  });
});
