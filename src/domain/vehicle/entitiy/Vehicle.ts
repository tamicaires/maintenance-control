import { randomUUID } from "crypto";
import { Replace } from "src/shared/utils/replace";

interface VehicleSchema {
  plate: string;
  model: string;
  brand: string;
  year: string;
  color: string | null;
  km: number;
  power: number;
  isActive: boolean;
  fleetId: string | null;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Vehicle {
  private _id: string;
  private props: VehicleSchema;


  constructor(
    props: Replace<VehicleSchema, { createdAt?: Date; updatedAt?: Date }>,
    id?: string) {
    this._id = id || randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
      updatedAt: new Date()
    }
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

  get model(): string {
    return this.props.model;
  }

  set model(model: string) {
    this.props.model = model;
  }

  get brand(): string {
    return this.props.brand;
  }

  set brand(brand: string) {
    this.props.brand = brand;
  }

  get year(): string {
    return this.props.year;
  }

  set year(year: string) {
    this.props.year = year;
  }

  get color(): string | null {
    return this.props.color;
  }

  set color(color: string | null) {
    this.props.color = color;
  }

  get km(): number {
    return this.props.km;
  }

  set km(km: number) {
    this.props.km = km;
  }

  get power(): number {
    return this.props.power;
  }

  set power(power: number) {
    this.props.power = power;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  set isActive(isActive: boolean) {
    this.props.isActive = isActive;
  }

  get fleetId(): string | null {
    return this.props.fleetId;
  }

  set fleetId(fleetId: string | null) {
    this.props.fleetId = fleetId;
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