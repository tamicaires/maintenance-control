import { randomUUID } from 'crypto';
import { Replace } from 'src/shared/utils/replace';

interface FleetSchema {
  fleetNumber: string;
  isActive: boolean;
  carrierId: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Fleet {
  private props: FleetSchema;
  private _id: string;

  constructor(
    props: Replace<FleetSchema, { createdAt?: Date; updatedAt?: Date }>,
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

  get fleetNumber(): string {
    return this.props.fleetNumber;
  }

  set fleetNumber(fleetNumber: string) {
    this.props.fleetNumber = fleetNumber;
  }

  get carrierId(): string {
    return this.props.carrierId;
  }

  set carrierId(carrierId: string) {
    this.props.carrierId = carrierId;
  }

  get companyId(): string {
    return this.props.companyId;
  }

  set companyId(companyId: string) {
    this.props.companyId = companyId;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  set isActive(isActive: boolean) {
    this.props.isActive = isActive;
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
