import { Service } from '../../../core/domain/entities/service';
import { ServiceCategory } from '../../../core/enum/service-category.enum';

type Override = Partial<Service>;

export const makeService = ({ id, ...override }: Override) => {
  return new Service(
    {
      serviceName: 'Troca de Lona',
      serviceCategory: ServiceCategory.Pneumatica,
      ...override,
    },
    id,
  );
};
