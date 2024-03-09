import { makeJob } from "../../factories/jobFactory"
import { JobRepositoryInMemory } from "../../repositories/jobRepositoryInMemory"
import { GetManyJobs } from "./getManyJobs"

let jobRepositoryInMemory: JobRepositoryInMemory
let getManyJobs: GetManyJobs

describe('Get many jobs', () => {

  beforeEach(() => { 
    jobRepositoryInMemory = new JobRepositoryInMemory()
    getManyJobs = new GetManyJobs(jobRepositoryInMemory)
  });

  it('Should be able to get many jobs', async () => {
    const jobs = [... new Array(10)].map(() => makeJob({}));

    jobRepositoryInMemory.jobs = jobs

    const result = await getManyJobs.execute({})

    expect(jobRepositoryInMemory.jobs).toHaveLength(10);

    expect(result).toEqual(jobs);
  });

  it('Should be able to control jobs perPage', async () => {
    const jobs = [... new Array(10)].map(() => makeJob({}));

    jobRepositoryInMemory.jobs = jobs;
    
    const result = await getManyJobs.execute({
      perPage: '8'
    });

    expect(result).toHaveLength(8)
  });

  it('Should be able to job page', async () =>{
    const fleets = [... new Array(10)].map((_, index) => makeJob({
      jobTitle: index < 5 ? 'page 1' : 'page 2'
    }));

    jobRepositoryInMemory.jobs = fleets;

    const result = await getManyJobs.execute({
      perPage: '5',
      page: '1'
    });

    expect(result[0].jobTitle).toEqual('page 1')
  });
});