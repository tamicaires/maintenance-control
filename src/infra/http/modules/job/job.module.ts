import { Module } from "@nestjs/common";
import { JobController } from "./job.controller";
import { CreateJob } from "src/modules/job/useCases/createJobUseCase/createJob";
import { DeleteJob } from "src/modules/job/useCases/deleteJobUseCase/deleteJob";
import { GetJob } from "src/modules/job/useCases/getJobUseCase/getJob";
import { GetManyJobs } from "src/modules/job/useCases/getManyJobsUseCase/getManyJobs";
import { DatabaseModule } from "src/infra/database/database.module";

@Module({
  controllers: [JobController],
  imports: [DatabaseModule],
  providers: [
    CreateJob,
    DeleteJob,
    GetJob,
    GetManyJobs
  ],
})

export class JobModule {}