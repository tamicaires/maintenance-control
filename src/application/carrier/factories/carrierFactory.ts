import { Carrier } from '../../../core/domain/entities/carrier';

type Override = Partial<Carrier>;

export const makeCarrier = ({ id, ...override }: Override) => {
  return new Carrier(
    {
      carrierName: '3T Transportes',
      managerName: 'Thiago',
      managerPhone: '(99) 99101-6185',
      isActive: true,
      companyId: '1',
      ...override,
    },
    id,
  );
};
