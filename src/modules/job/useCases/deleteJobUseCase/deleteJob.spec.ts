import { JobNotFoundException } from "../../exceptions/JobNotFoundException";
import { makeJob } from "../../factories/jobFactory";
import { JobRepositoryInMemory } from "../../repositories/jobRepositoryInMemory";
import { DeleteJob } from "./deleteJob";

let jobRepositoryInMemory: JobRepositoryInMemory
let deleteJob: DeleteJob

describe('Delete Job',() => {
  beforeEach(() => {
    jobRepositoryInMemory = new JobRepositoryInMemory()
    deleteJob = new DeleteJob(jobRepositoryInMemory);
  });

  it('Should be able to delete job', async () => {
    const job = makeJob({});

    jobRepositoryInMemory.jobs = [job];

    await deleteJob.execute({ jobId: job.id });

    expect(jobRepositoryInMemory.jobs).toHaveLength(0);
  });

  it('Should be able to throw error when not find job', async () => {

    expect(async () => {
      await deleteJob.execute({
        jobId: 'fakeId'
      });
    }).rejects.toThrow(JobNotFoundException)
    
  });
});