import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";

interface TrailerSchema {
  plate: string;
  position: number;
  fleetId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Trailer {
  private _id: string;
  private props: TrailerSchema;

  constructor(props: Replace<
    TrailerSchema,
    { createdAt?: Date; updatedAt?: Date; description?: string | null }
  >, id?: string) {
    this._id = id || randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: new Date(),
    };
  }

  get id(): string {
    return this._id;
  }

  get plate(): string {
    return this.props.plate;
  }

  set plate(plate: string) {
    this.props.plate = plate;
  }

  get position(): number {
    return this.props.position;
  }

  set position(position: number) {
    this.props.position = position;
  }

  get fleetId(): string {
    return this.props.fleetId;
  }

  set fleetId(fleetId: string) {
    this.props.fleetId = fleetId;
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