import { WorkOrderNotFoundException } from "../../exceptions/workOrderNotFoundException";
import { makeWorkOrder } from "../../factories/workOrderFactory";
import { WorkOrderRepositoryInMemory } from "../../repositories/workOrderRepositoryInMemory";
import { GetWorkOrder } from "./getWorkOrder";

let workOrderRepositoryInMemory: WorkOrderRepositoryInMemory;
let getWorkOrder: GetWorkOrder

describe('Get Work Order', () => {
  beforeEach(() => { 
    workOrderRepositoryInMemory = new WorkOrderRepositoryInMemory();
    getWorkOrder = new GetWorkOrder(workOrderRepositoryInMemory);
  });

  it('SHould be able to get work order', async () => {
    const workOrder = makeWorkOrder({});

    workOrderRepositoryInMemory.workOrders = [workOrder];

    const result = await getWorkOrder.execute({
      workOrderId: workOrder.id
    });

    expect(result).toEqual(workOrder);
  });

  it('Should be able to throw error when not find work order', () => {
    
    expect(async () => {
      await getWorkOrder.execute({
        workOrderId: 'fakeId'
      });
    }).rejects.toThrow(WorkOrderNotFoundException);
  });
});