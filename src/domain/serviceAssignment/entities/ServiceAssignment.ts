import { randomUUID } from 'crypto';
import { Replace } from 'src/shared/utils/replace';

interface ServiceAssignmentProps {
  workOrderId: string;
  serviceId: string;
  employeeId: string;
  startAt: Date | null;
  endAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class ServiceAssignment {
  private props: ServiceAssignmentProps;
  private _id: string;

  constructor(
    props: Replace<
      ServiceAssignmentProps,
      { createdAt?: Date; updatedAt?: Date }
    >,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: new Date(),
    };

    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get workOrderId(): string {
    return this.props.workOrderId;
  }

  set workOrderId(workOrderId: string) {
    this.props.workOrderId = workOrderId;
  }

  get serviceId(): string {
    return this.props.serviceId;
  }

  set serviceId(serviceId: string) {
    this.props.serviceId = serviceId;
  }

  get employeeId(): string {
    return this.props.employeeId;
  }

  set employeeId(employeeId: string) {
    this.props.employeeId = employeeId;
  }

  get startAt(): Date | null {
    return this.props.startAt;
  }

  set startAt(startAt: Date | null) {
    this.props.startAt = startAt;
  }

  get endAt(): Date | null {
    return this.props.endAt;
  }

  set endAt(endAt: Date | null) {
    this.props.endAt = endAt;
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
