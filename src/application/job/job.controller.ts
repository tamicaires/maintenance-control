import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateJobBody } from './dto/createJobBody';
import { JobViewModel } from './viewModels/JobViewModel';
import { CreateJob } from 'src/domain/job/useCases/createJob/createJob';
import { DeleteJob } from 'src/domain/job/useCases/deleteJob/deleteJob';
import { GetJob } from 'src/domain/job/useCases/getJob/getJob';
import { GetManyJobs } from 'src/domain/job/useCases/getManyJobs/getManyJobs';

@Controller('jobs')
export class JobController {
  constructor(
    private createJobUseCase: CreateJob,
    private deleteJobUseCase: DeleteJob,
    private getJobUseCase: GetJob,
    private getManyJobsUseCase: GetManyJobs,
  ) {}

  @Post()
  async createJob(@Body() body: CreateJobBody) {
    const { jobTitle } = body;

    const job = await this.createJobUseCase.execute({
      jobTitle,
    });

    return JobViewModel.toHttp(job);
  }

  @Delete(':id')
  async deleteJob(@Param('id') jobId: string) {
    await this.deleteJobUseCase.execute({
      jobId,
    });
  }

  @Get(':id')
  async getJob(@Param('id') jobId: string) {
    const job = await this.getJobUseCase.execute({
      jobId,
    });

    return JobViewModel.toHttp(job);
  }

  @Get()
  async getManyJobs(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
  ) {
    const jobs = await this.getManyJobsUseCase.execute({
      page,
      perPage,
    });

    return jobs?.map(JobViewModel.toHttp);
  }
}
