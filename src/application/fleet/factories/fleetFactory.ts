import { Fleet } from '../../../core/domain/entities/fleet';
type Override = Partial<Fleet>;

export const makeFleet = ({ id, ...override }: Override) => {
  return new Fleet(
    {
      fleetNumber: '22541',
      carrierId: '1223645',
      isActive: true,
      companyId: '123',
      ...override,
    },
    id,
  );
};
