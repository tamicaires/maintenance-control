import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateJob } from 'src/application/job/useCases/createJob/createJob';
import { DeleteJob } from 'src/application/job/useCases/deleteJob/deleteJob';
import { GetJob } from 'src/application/job/useCases/getJob/getJob';
import { GetManyJobs } from 'src/application/job/useCases/getManyJobs/getManyJobs';

@Module({
  controllers: [JobController],
  imports: [DatabaseModule],
  providers: [CreateJob, DeleteJob, GetJob, GetManyJobs],
})
export class JobModule { }
