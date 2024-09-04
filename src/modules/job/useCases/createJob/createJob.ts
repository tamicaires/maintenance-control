import { Injectable } from '@nestjs/common';
import { Job } from '../../entities/Job';
import { JobRepository } from '../../repositories/jobRepository';
import { JobWithSameNameException } from '../../exceptions/JobWithSameNameException';

interface CreateNoteRequest {
  jobTitle: string;
}

@Injectable()
export class CreateJob {
  constructor(private jobRepository: JobRepository) {}
  async execute({ jobTitle }: CreateNoteRequest) {
    const jobAlreadyExists = await this.jobRepository.findOne(jobTitle);

    if (jobAlreadyExists) throw new JobWithSameNameException();

    const job = new Job({
      jobTitle,
    });

    await this.jobRepository.create(job);

    return job;
  }
}
