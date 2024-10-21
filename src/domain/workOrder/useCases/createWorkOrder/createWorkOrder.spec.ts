import { makeFleet } from 'src/modules/fleet/factories/fleetFactory';
import { WorkOrderRepositoryInMemory } from '../../repositories/workOrderRepositoryInMemory';
import { CreateWorkOrder } from './createWorkOrder';
import { MaintenanceStatus } from '../../../../core/enum/maitenance-status.enum';
import { Box } from '../../../../core/enum/box.enum';
import { TypeOfMaintenance } from '../../../../core/enum/type-of-maintenance.enum';
import { makeUser } from 'src/modules/user/factories/userFactory';

let workOrderRepositoryInMemory: WorkOrderRepositoryInMemory;
let createWorkOrder: CreateWorkOrder;

describe('Create Work Order', () => {
  beforeEach(() => {
    workOrderRepositoryInMemory = new WorkOrderRepositoryInMemory();
    createWorkOrder = new CreateWorkOrder(workOrderRepositoryInMemory);
  });

  it('Should be able to create work order', async () => {
    expect(workOrderRepositoryInMemory.workOrders).toEqual([]);
    const user = makeUser({});
    const fleet = makeFleet({});

    const workOrder = await createWorkOrder.execute({
      userId: user.id,
      fleetId: fleet.id,
      severityLevel: 'high',
      entryQueue: new Date(),
      entryMaintenance: new Date(),
      status: MaintenanceStatus.QUEUE,
      box: Box.FIVE,
      typeOfMaintenance: TypeOfMaintenance.CORRECTIVE,
    });

    expect(workOrderRepositoryInMemory.workOrders).toEqual([workOrder]);
  });
});
