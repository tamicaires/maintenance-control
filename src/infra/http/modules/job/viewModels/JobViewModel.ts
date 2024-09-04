import { Job } from 'src/modules/job/entities/Job';

export class JobViewModel {
  static toHttp({ id, jobTitle }: Job) {
    return {
      id,
      jobTitle,
    };
  }
}
