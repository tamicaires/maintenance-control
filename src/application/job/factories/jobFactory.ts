import { Job } from '../../../core/domain/entities/job';

type Override = Partial<Job>;

export const makeJob = ({ id, ...override }: Override) => {
  return new Job(
    {
      jobTitle: 'Mecânico',
      ...override,
    },
    id,
  );
};
