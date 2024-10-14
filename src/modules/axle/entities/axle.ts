import { Replace } from "src/utils/replace";
import { TAxle } from "../enum/axle.enum";
import { randomUUID } from "crypto";

interface AxleSchema {
  position: string;
  capacity: number | null;
  type: TAxle;
  trailerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Axle {
  private _id: string;
  private props: AxleSchema;

  constructor(props: Replace<AxleSchema, { createdAt?: Date, updatedAt?: Date }>, id?: string) {
    this._id = id || randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
      updatedAt: new Date()
    };
  }

  get id(): string {
    return this._id;
  }

  get position(): string {
    return this.props.position;
  }

  set position(position: string) {
    this.props.position = position;
  }

  get capacity(): number | null {
    return this.props.capacity;
  }

  set capacity(capacity: number | null) {
    this.props.capacity = capacity;
  }

  get type(): TAxle {
    return this.props.type;
  }

  set type(type: TAxle) {
    this.props.type = type;
  }

  get trailerId(): string {
    return this.props.trailerId;
  }

  set trailerId(trailerId: string) {
    this.props.trailerId = trailerId;
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