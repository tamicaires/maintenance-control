import { Injectable } from '@nestjs/common';
import { JobRepository } from '../../../../core/domain/repositories/job-repository';

interface GetManyJobsRequest {
  page?: string;
  perPage?: string;
}

@Injectable()
export class GetManyJobs {
  constructor(private jobRepository: JobRepository) {}
  async execute({ page, perPage }: GetManyJobsRequest) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PERPAGE = 20;

    const currentPage = Number(page) || DEFAULT_PAGE;
    const currentPerPage = Number(perPage) || DEFAULT_PERPAGE;

    const fleets = await this.jobRepository.findMany(
      currentPage,
      currentPerPage,
    );

    return fleets;
  }
}
