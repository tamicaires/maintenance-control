import { Job } from '../entities/job';

export abstract class JobRepository {
  abstract create(job: Job): Promise<void>;
  abstract findById(id: string): Promise<Job | null>;
  abstract delete(id: string): Promise<void>;
  abstract findOne(jobTitle: string): Promise<Job | null>;
  abstract findMany(page: number, perPage: number): Promise<Job[]>;
}
