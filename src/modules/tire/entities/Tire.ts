import { Replace } from "src/utils/replace";
import { TTireCondition, TTireLocation } from "../enum/tire.enum";
import { randomUUID } from "crypto";

interface TireSchema {
  brand: string;
  serialNumber: string;
  axleId: string | null;
  status: TTireCondition;
  treadDepth: number | null;
  treadPattern: string | null;
  wearRating: number | null;
  fireNumber: string | null;
  location: TTireLocation;
  createdAt: Date;
  updatedAt: Date;
}

export class Tire {
  private _id: string;
  private props: TireSchema;

  constructor(props: Replace<TireSchema, {
    axleId?: string | null;
    treadDepth?: number | null;
    treadPattern?: string | null;
    wearRating?: number | null;
    fireNumber?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }>, id?: string) {
    this._id = id || randomUUID();
    this.props = {
      ...props,
      axleId: props.axleId ?? null,
      treadDepth: props.treadDepth ?? null,
      treadPattern: props.treadPattern ?? null,
      wearRating: props.wearRating ?? null,
      fireNumber: props.fireNumber ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  get id(): string {
    return this._id;
  }

  get brand(): string {
    return this.props.brand;
  }

  set brand(brand: string) {
    this.props.brand = brand;
  }

  get serialNumber(): string {
    return this.props.serialNumber;
  }

  set serialNumber(serialNumber: string) {
    this.props.serialNumber = serialNumber;
  }

  get axleId(): string | null {
    return this.props.axleId;
  }

  set axleId(axleId: string | null) {
    this.props.axleId = axleId;
  }

  get status(): TTireCondition {
    return this.props.status;
  }

  set status(status: TTireCondition) {
    this.props.status = status;
  }

  get treadDepth(): number | null {
    return this.props.treadDepth;
  }

  set treadDepth(treadDepth: number | null) {
    this.props.treadDepth = treadDepth;
  }

  get treadPattern(): string | null {
    return this.props.treadPattern;
  }

  set treadPattern(treadPattern: string | null) {
    this.props.treadPattern = treadPattern;
  }

  get wearRating(): number | null {
    return this.props.wearRating;
  }

  set wearRating(wearRating: number | null) {
    this.props.wearRating = wearRating;
  }

  get fireNumber(): string | null {
    return this.props.fireNumber;
  }

  set fireNumber(fireNumber: string | null) {
    this.props.fireNumber = fireNumber;
  }

  get location(): TTireLocation {
    return this.props.location;
  }

  set location(location: TTireLocation) {
    this.props.location = location;
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