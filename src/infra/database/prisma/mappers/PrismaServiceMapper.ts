import { Service as ServiceRaw } from '@prisma/client';
import { ServiceCategory } from 'src/core/enum/service-category.enum';
import { Service } from 'src/domain/service/entities/Service';

export class PrismaServiceMapper {
  static toPrisma({ id, serviceName, serviceCategory }: Service): ServiceRaw {
    return {
      id,
      serviceName,
      serviceCategory,
    };
  }

  static toDomain({ id, serviceCategory, serviceName }: ServiceRaw): Service {
    return new Service(
      {
        serviceName,
        serviceCategory: serviceCategory as ServiceCategory,
      },
      id,
    );
  }
}
