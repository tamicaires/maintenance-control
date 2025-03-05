import { Service as ServiceRaw } from '@prisma/client';
import { Service } from 'src/core/domain/entities/service';
import { ServiceCategory } from 'src/core/enum/service-category.enum';

export class PrismaServiceMapper {
  static toPrisma({ id, serviceName, serviceCategory, weight, companyId }: Service): ServiceRaw {
    return {
      id,
      serviceName,
      serviceCategory,
      companyId,
      weight,
    };
  }

  static toDomain({ id, serviceCategory, serviceName, weight, companyId }: ServiceRaw): Service {
    return new Service(
      {
        serviceName,
        serviceCategory: serviceCategory as ServiceCategory,
        weight,
        companyId
      },
      id,
    );
  }
}
