import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace"

interface JobProps{
  jobTitle: string
}

export class Job {
  private props: JobProps
  private _id: string

  constructor(props: Replace<JobProps, { createdAt?: Date, updatedAt?: Date}>, id?: string){
    this.props = {
      ...props,
    }
    this._id = id || randomUUID()
  };

  get id(): string { 
    return this._id;
  };

  get jobTitle(): string {
    return this.props.jobTitle;
  };

  set jobTitle(jobTitle: string) {
    this.props.jobTitle = jobTitle;
  };
};