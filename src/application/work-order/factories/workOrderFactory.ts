import { WorkOrder } from 'src/core/domain/entities/work-order';
import { MaintenanceStatus } from '../../../core/enum/maitenance-status.enum';
import { TypeOfMaintenance } from '../../../core/enum/type-of-maintenance.enum';
import { makeUser } from 'src/application/user/factories/userFactory';

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
