import { Job } from "src/domain/job/entities/Job";

export class JobViewModel {
  static toHttp({ id, jobTitle }: Job) {
    return {
      id,
      jobTitle,
    };
  }
}
