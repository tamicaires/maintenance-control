import { JobNotFoundException } from "../../exceptions/JobNotFoundException";
import { makeJob } from "../../factories/jobFactory";
import { JobRepositoryInMemory } from "../../repositories/jobRepositoryInMemory";
import { GetJob } from "./getJob";


let jobRepositoryInMemory: JobRepositoryInMemory
let getJob: GetJob

describe('Get Job', () => {
  beforeEach(() => {
    jobRepositoryInMemory = new JobRepositoryInMemory()
    getJob = new GetJob(jobRepositoryInMemory)
  });

  it('Should be able to get job if exists', async () => {
    const job = makeJob({});

    jobRepositoryInMemory.jobs = [job];

    const result = await getJob.execute({ jobId: job.id });

    expect(result).toEqual(job);
  });

  it('Should be able to throw error when not find job', async () => {
    
    expect(async () => {
      await getJob.execute({
        jobId: 'fakeId'
      })
    }).rejects.toThrow(JobNotFoundException)
  });
});