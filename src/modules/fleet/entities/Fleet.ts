import { randomUUID } from 'crypto';
import { FleetStatus } from '../enum/fleet-status.enum';
import { Replace } from 'src/utils/replace';

interface FleetSchema {
  fleetNumber: string;
  plate: string;
  firstTrailerPlate: string;
  secondTrailerPlate: string;
  thirdTrailerPlate: string;
  km: string;
  carrierId: string;
  status: FleetStatus;
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

  get plate(): string {
    return this.props.plate;
  }

  set plate(plate: string) {
    this.props.plate = plate;
  }

  get firstTrailerPlate(): string {
    return this.props.firstTrailerPlate;
  }

  set firstTrailerPlate(firstTrailerPlate: string) {
    this.props.firstTrailerPlate = firstTrailerPlate;
  }

  get secondTrailerPlate(): string {
    return this.props.secondTrailerPlate;
  }

  set secondTrailerPlate(secondTrailerPlate: string) {
    this.props.secondTrailerPlate = secondTrailerPlate;
  }

  get thirdTrailerPlate(): string {
    return this.props.thirdTrailerPlate;
  }

  set thirdTrailerPlate(thirdTrailerPlate: string) {
    this.props.thirdTrailerPlate = thirdTrailerPlate;
  }

  get km(): string {
    return this.props.km;
  }

  set km(km: string) {
    this.props.km = km;
  }

  get carrierId(): string {
    return this.props.carrierId;
  }

  set carrierId(carrierId: string) {
    this.props.carrierId = carrierId;
  }

  get status(): FleetStatus {
    return this.props.status;
  }

  set status(status: FleetStatus) {
    this.props.status = status;
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
