import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { CreateJob } from 'src/modules/job/useCases/createJob/createJob';
import { DeleteJob } from 'src/modules/job/useCases/deleteJob/deleteJob';
import { GetJob } from 'src/modules/job/useCases/getJob/getJob';
import { GetManyJobs } from 'src/modules/job/useCases/getManyJobs/getManyJobs';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  controllers: [JobController],
  imports: [DatabaseModule],
  providers: [CreateJob, DeleteJob, GetJob, GetManyJobs],
})
export class JobModule {}
