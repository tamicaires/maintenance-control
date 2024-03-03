import { makeFleet } from "src/modules/fleet/factories/fleetFactory";
import { WorkOrderRepositoryInMemory } from "../../repositories/workOrderRepositoryInMemory";
import { CreateWorkOrder } from "./createWorkOrder";
import { MaintenanceStatus } from "../../enum/maitenance-status.enum";
import { Box } from "../../enum/box.enum";
import { TypeOfMaintenance } from "../../enum/type-of-maintenance.enum";

let workOrderRepositoryInMemory: WorkOrderRepositoryInMemory;
let createWorkOrder: CreateWorkOrder;

describe('Create Work Order', () => {
  beforeEach(() => {
    workOrderRepositoryInMemory = new WorkOrderRepositoryInMemory();
    createWorkOrder = new CreateWorkOrder(workOrderRepositoryInMemory);
  });

  it('Should be able to create work order', async () => {
    expect(workOrderRepositoryInMemory.workOrders).toEqual([]);

    const fleet = makeFleet({});

    const workOrder = await createWorkOrder.execute({
      fleetId: fleet.id,
      severityLevel: 'high',
      entryQueue: new Date(),
      entryMaintenance: new Date(),
      status: MaintenanceStatus.Queue,
      box: Box.FIVE,
      typeOfMaintenance: TypeOfMaintenance.CORRECTIVE,
    });

    expect(workOrderRepositoryInMemory.workOrders).toEqual([workOrder]);
  });
});