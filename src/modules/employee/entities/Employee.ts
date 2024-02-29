import { Replace } from "src/utils/replace";
import { EmployeeStatus } from "../enum/employee-status.enum";
import { randomUUID } from "crypto";

interface EmployeeSchema {
  name: string;
  workShift: string;
  jobId: string;
  status: EmployeeStatus;
  createdAt: Date;
  updatedAt: Date; 
}

export class Employee {
  private props: EmployeeSchema
  private _id: string

  constructor(props: Replace<EmployeeSchema, {createdAt?: Date, updatedAt?: Date}>, 
    id?: string){
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
      updatedAt: new Date()
    }
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  };

  get name(): string {
    return this.props.name;
  };

  set name(name: string) {
    this.props.name = name;
  };

  get workShift(): string {
    return this.props.workShift;
  };

  set workShift(workShift: string) {
    this.props.workShift = workShift;
  };

  get jobId(): string {
    return this.props.jobId;
  };

  set jobId(jobId: string) {
    this.props.jobId = jobId;
  };

  get status(): EmployeeStatus {
    return this.props.status;
  };

  set status(status: EmployeeStatus) {
    this.props.status = status;
  };

  get createdAt(): Date {
    return this.props.createdAt;
  };

  get updatedAt(): Date {
    return this.props.updatedAt;
  };

  set updatedAt(updatedAt : Date) {
    this.props.updatedAt = updatedAt
  };
};