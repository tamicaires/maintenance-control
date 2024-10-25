import { Injectable } from '@nestjs/common';
import { Job } from '../../../../core/domain/entities/job';
import { JobRepository } from '../../../../core/domain/repositories/job-repository';
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
