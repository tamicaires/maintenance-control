import { Job } from '../../../core/domain/entities/job';
import { JobRepository } from '../../../core/domain/repositories/job-repository';

export class JobRepositoryInMemory implements JobRepository {
  public jobs: Job[] = [];

  async create(job: Job): Promise<void> {
    this.jobs.push(job);
  }

  async findById(id: string): Promise<Job | null> {
    const job = this.jobs.find((job) => job.id === id);

    if (!job) return null;

    return job;
  }

  async delete(id: string): Promise<void> {
    this.jobs = this.jobs.filter((note) => note.id !== id);
  }

  async findMany(page: number, perPage: number): Promise<Job[]> {
    return this.jobs.slice((page - 1) * perPage, page * perPage);
  }

  async findOne(jobTitle: string): Promise<Job | null> {
    const job = this.jobs.find((job) => job.jobTitle === jobTitle);

    if (!job) return null;

    return job;
  }
}
