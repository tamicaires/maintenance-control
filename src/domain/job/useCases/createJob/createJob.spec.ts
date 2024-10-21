import { JobWithSameNameException } from '../../exceptions/JobWithSameNameException';
import { makeJob } from '../../factories/jobFactory';
import { JobRepositoryInMemory } from '../../repositories/jobRepositoryInMemory';
import { CreateJob } from './createJob';

let jobRepositoryInMemory: JobRepositoryInMemory;
let createJob: CreateJob;

describe('Create Job', () => {
  beforeEach(() => {
    jobRepositoryInMemory = new JobRepositoryInMemory();
    createJob = new CreateJob(jobRepositoryInMemory);
  });

  it('Should be able to create a job', async () => {
    expect(jobRepositoryInMemory.jobs).toEqual([]);

    const job = await createJob.execute({
      jobTitle: 'Mecânico',
    });

    expect(jobRepositoryInMemory.jobs).toEqual([job]);
  });

  it('Should be able to throw error when job title already exists', async () => {
    const job = makeJob({
      jobTitle: 'Mecânico',
    });

    jobRepositoryInMemory.jobs = [job];

    expect(async () => {
      await createJob.execute({ jobTitle: 'Mecânico' });
    }).rejects.toThrow(JobWithSameNameException);
  });
});
