import { Injectable } from "@nestjs/common";
import { Job } from "../../entities/Job";
import { JobRepository } from "../../repositories/jobRepository";

interface CreateNoteRequest {
  jobTitle: string
}

@Injectable()
export class CreateJob {
  constructor(private jobRepository: JobRepository){}
  async execute({ jobTitle }: CreateNoteRequest) {
    const job = new Job({
      jobTitle
    });  
    
    await this.jobRepository.create(job);

    return job;
  };
};