import { JobNotFoundException } from "../../exceptions/JobNotFoundException"
import { makeJob } from "../../factories/jobFactory"
import { JobRepositoryInMemory } from "../../repositories/jobRepositoryInMemory"
import { EditJob } from "./editJob"

let jobRepositoryInMemory: JobRepositoryInMemory
let editJob: EditJob

describe('Edit Job', () => {
  beforeEach(() => {
    jobRepositoryInMemory = new JobRepositoryInMemory()
    editJob = new EditJob(jobRepositoryInMemory)
  });

  it('Should be able to edit a job', async () => {
    const job = makeJob({});

    jobRepositoryInMemory.jobs = [job];

    const jobTitleChanged = 'Adm';

    await editJob.execute({
      jobId: job.id,
      jobTitle: jobTitleChanged
    });

    expect(jobRepositoryInMemory.jobs[0].jobTitle).toEqual(jobTitleChanged);
  });

  it('Should be able to throw error when not find job', async () =>{
    
    expect(async () => {
      await editJob.execute({
        jobId: 'fakeId',
        jobTitle: 'fakeTitle'
      });
    }).rejects.toThrow(JobNotFoundException);
  });

});