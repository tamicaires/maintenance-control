import { Job } from "src/core/domain/entities/job";

export class JobViewModel {
  static toHttp({ id, jobTitle }: Job) {
    return {
      id,
      jobTitle,
    };
  }
}
