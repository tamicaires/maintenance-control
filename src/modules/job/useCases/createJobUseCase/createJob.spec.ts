import { JobRepositoryInMemory } from "../../repositories/jobRepositoryInMemory";
import { CreateJob } from "./createJob";

let jobRepositoryInMemory: JobRepositoryInMemory
let createJob: CreateJob

describe('Create Job', () => {

  beforeEach(() => {
    jobRepositoryInMemory = new JobRepositoryInMemory()
    createJob = new CreateJob(jobRepositoryInMemory)
  });

  it('Should be able to create a job', async () => {
    expect(jobRepositoryInMemory.jobs).toEqual([]);

    const job = await createJob.execute({
      jobTitle: 'Mecânico'
    });

    expect(jobRepositoryInMemory.jobs).toEqual([job])
  });
});