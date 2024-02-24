import { JobNotFoundException } from "../../exceptions/JobNotFoundException";
import { JobRepository } from "../../repositories/jobRepository";

interface EditJobRequest {
  jobId: string,
  jobTitle: string
};

export class EditJob{
  constructor(private jobRepository: JobRepository){}
  async execute({ jobId, jobTitle }: EditJobRequest){
    const job = await this.jobRepository.findById(jobId);

    if(!job) throw new JobNotFoundException();

    job.jobTitle = jobTitle;

    await this.jobRepository.save(job);
    
    return job;
  };
};