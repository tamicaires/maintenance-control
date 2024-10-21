import { makeUser } from 'src/modules/user/factories/userFactory';
import { WorkOrder } from '../entities/WorkOrder';
import { Box } from '../../../core/enum/box.enum';
import { MaintenanceStatus } from '../../../core/enum/maitenance-status.enum';
import { TypeOfMaintenance } from '../../../core/enum/type-of-maintenance.enum';

type Override = Partial<WorkOrder>;

export const makeWorkOrder = ({ id, ...override }: Override) => {
  const user = makeUser({});

  return new WorkOrder(
    {
      userId: user.id,
      displayId: 'CO001',
      fleetId: '123456',
      severityLevel: 'high',
      entryQueue: new Date(),
      entryMaintenance: new Date(),
      status: MaintenanceStatus.AguardandoPeca,
      boxId: "1",
      typeOfMaintenance: TypeOfMaintenance.Corretiva,
      companyId: '123456',
      isCancelled: false,
      ...override,
    },
    id,
  );
};
