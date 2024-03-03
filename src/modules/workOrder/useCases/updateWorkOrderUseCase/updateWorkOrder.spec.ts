import { InvalidDateException } from "../../exceptions/invalidDatesException";
import { WorkOrderNotFoundException } from "../../exceptions/workOrderNotFoundException";
import { makeWorkOrder } from "../../factories/workOrderFactory";
import { WorkOrderRepositoryInMemory } from "../../repositories/workOrderRepositoryInMemory";
import { UpdateWorkOrder } from "./updateWorkOrder";

let workOrderRepositoryInMemory: WorkOrderRepositoryInMemory;
let updateWorkOrder: UpdateWorkOrder;

describe('Update Work Order', () => {
  beforeEach(() => {
    workOrderRepositoryInMemory = new WorkOrderRepositoryInMemory();
    updateWorkOrder = new UpdateWorkOrder(workOrderRepositoryInMemory);
  });

  it('Should be able to update work order', async () => {
    const workOrder = makeWorkOrder({ });

    workOrderRepositoryInMemory.workOrders = [workOrder];

    const severityLevelChanged = 'low';

    const result = await updateWorkOrder.execute({
      workOrderId: workOrder.id,
      severityLevel: severityLevelChanged
    });

    expect(result.severityLevel).toEqual(severityLevelChanged);
  });

  it('Should be able to throw error when not find work order', async () =>{

    expect(async () => {
      await updateWorkOrder.execute({
        workOrderId: 'fakeId'
      })
    }).rejects.toThrow(WorkOrderNotFoundException);
  });


  it('Should be able to throw error whren validate entries date dont work', async () => {
    const workOrder = makeWorkOrder({});

    workOrderRepositoryInMemory.workOrders = [workOrder];

    const entryQueueChanged = new Date('2024-03-15T08:00:00');

    const entryMaintenanceChanged = new Date('2024-03-02T12:00:00');

    expect(async () => {
      await updateWorkOrder.execute({
        workOrderId: workOrder.id,
        entryQueue: entryQueueChanged,
        entryMaintenance: entryMaintenanceChanged
      });
    }).rejects.toThrow(InvalidDateException);
  });

  
  it('Should be able to validate exit date orders', async () => {
    const workOrder = makeWorkOrder({});

    workOrderRepositoryInMemory.workOrders = [workOrder];

    const entryMaintenanceChanged = new Date('2024-03-15T08:00:00');
    const exitMaintenanceChanged = new Date('2024-03-02T12:00:00');

    expect(async () => {
      await updateWorkOrder.execute({
        workOrderId: workOrder.id,
        entryQueue: undefined,
        entryMaintenance: entryMaintenanceChanged,
        exitMaintenance: exitMaintenanceChanged
      });
    }).rejects.toThrow(InvalidDateException);
  });

});