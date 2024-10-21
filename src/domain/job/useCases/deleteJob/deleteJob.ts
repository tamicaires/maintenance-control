import { Injectable } from '@nestjs/common';
import { JobNotFoundException } from '../../exceptions/JobNotFoundException';
import { JobRepository } from '../../repositories/jobRepository';

interface DeleteJobRequest {
  jobId: string;
}

@Injectable()
export class DeleteJob {
  constructor(private jobRepository: JobRepository) {}

  async execute({ jobId }: DeleteJobRequest) {
    const job = await this.jobRepository.findById(jobId);

    if (!job) throw new JobNotFoundException();

    await this.jobRepository.delete(jobId);
  }
}
