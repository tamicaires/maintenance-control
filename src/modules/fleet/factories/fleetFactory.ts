import { Fleet } from '../entities/Fleet';
import { FleetStatus } from '../enum/fleet-status.enum';

type Override = Partial<Fleet>;

export const makeFleet = ({ id, ...override }: Override) => {
  return new Fleet(
    {
      fleetNumber: '22541',
      plate: 'OBC5F2C',
      km: '352.2',
      carrierId: '1223645',
      isActive: true,
      companyId: '123',
      ...override,
    },
    id,
  );
};
