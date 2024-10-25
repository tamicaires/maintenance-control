import { Job as JobRaw } from '@prisma/client';
import { Job } from 'src/core/domain/entities/job';

export class PrismaJobMapper {
  static toPrisma({ id, jobTitle }: Job): JobRaw {
    return {
      id,
      jobTitle,
    };
  }

  static toDomain({ id, jobTitle }: JobRaw): Job {
    return new Job(
      {
        jobTitle,
      },
      id,
    );
  }
}
