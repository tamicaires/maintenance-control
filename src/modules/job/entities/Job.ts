import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace"

interface JobProps{
  jobTitle: string
  createdAt: Date;
  updatedAt: Date;
}

export class Job {
  private props: JobProps
  private _id: string

  constructor(props: Replace<JobProps, { createdAt?: Date, updatedAt?: Date}>, id?: string){
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: new Date(),
    }
    this._id = id || randomUUID()
  }
  get id(): string {
    return this._id;
  }

  get jobTitle(): string {
    return this.props.jobTitle;
  }

  set jobTitle(jobTitle: string) {
    this.props.jobTitle = jobTitle;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  set updatedAt(updatedAt : Date) {
    this.props.updatedAt = updatedAt
  }
}