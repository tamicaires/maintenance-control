import { Job } from "../entities/Job";

type Override = Partial<Job>

export const makeJob = ({id, ...override}: Override) => {
  return new Job({
    jobTitle: 'Mecânico',
    ...override
  }, 
  id
  );
};