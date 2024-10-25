import { Injectable } from '@nestjs/common';
import { JobRepository } from '../../../../core/domain/repositories/job-repository';
import { JobNotFoundException } from '../../exceptions/JobNotFoundException';

interface GetJobRequest {
  jobId: string;
}

@Injectable()
export class GetJob {
  constructor(private jobRepository: JobRepository) {}
  async execute({ jobId }: GetJobRequest) {
    const job = await this.jobRepository.findById(jobId);

    if (!job) throw new JobNotFoundException();

    return job;
  }
}
