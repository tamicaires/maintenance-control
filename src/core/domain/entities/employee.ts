import { Replace } from 'src/shared/utils/replace';
import { randomUUID } from 'crypto';

interface EmployeeSchema {
  name: string;
  workShift: string;
  jobTitleId: string;
  isActive: boolean;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Employee {
  private props: EmployeeSchema;
  private _id: string;

  constructor(
    props: Replace<EmployeeSchema, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
      updatedAt: new Date(),
    };
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get workShift(): string {
    return this.props.workShift;
  }

  set workShift(workShift: string) {
    this.props.workShift = workShift;
  }

  get jobTitleId(): string {
    return this.props.jobTitleId;
  }

  set jobTitleId(jobTitleId: string) {
    this.props.jobTitleId = jobTitleId;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  set isActive(isActive: boolean) {
    this.props.isActive = isActive;
  }

  get companyId(): string {
    return this.props.companyId;
  }

  set companyId(companyId: string) {
    this.props.companyId = companyId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }
}

import { z } from "zod";

export class Employees implements EmployeesType {
  id: string;
  name: string;
  workShift: string;
  jobTitleId: string;
  isActive: boolean;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: EmployeesType) {
    this.id = data.id ?? randomUUID();
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = new Date();
    Object.assign(this, data);
  }
}

const schema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  workShift: z.string(),
  jobTitleId: z.string(),
  isActive: z.boolean(),
  companyId: z.string().uuid(),
  createdAt: z.date().default(() => new Date()).optional(),
  updatedAt: z.date().default(() => new Date()).optional()
})

export type EmployeesType = z.infer<typeof schema>;