import { Replace } from "src/utils/replace";
import { TPartLocation, TPartStatus } from "../../../core/enum/part.enum";
import { randomUUID } from "crypto";

interface PartSchema {
  name: string;
  description: string | null;
  partNumber: string;
  model: string | null;
  brand: string | null;
  supplier: string | null;
  costPrice: number;
  sellingPrice: number | null;
  stockQuantity: number;
  location: TPartLocation;
  status: TPartStatus;
  categoryId: string;
  trailerId: string | null;
  axleId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Part {
  private _id: string
  private props: PartSchema

  constructor(
    props: Replace<PartSchema, {
      description?: string | null,
      model?: string | null,
      brand?: string | null,
      supplier?: string | null,
      sellingPrice?: number | null,
      trailerId?: string | null,
      axleId?: string | null,
      createdAt?: Date,
      updatedAt?: Date
    }>,
    id?: string
  ) {

    this.props = {
      ...props,
      description: props.description ?? null,
      model: props.model ?? null,
      brand: props.brand ?? null,
      supplier: props.supplier ?? null,
      sellingPrice: props.sellingPrice ?? null,
      trailerId: props.trailerId ?? null,
      axleId: props.axleId ?? null,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date()
    }

    this._id = id || randomUUID()
  }

  get id() {
    return this._id
  }

  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get description(): string | null {
    return this.props.description
  }

  set description(description: string | null) {
    this.props.description = description
  }

  get partNumber(): string {
    return this.props.partNumber
  }

  set partNumber(partNumber: string) {
    this.props.partNumber = partNumber
  }

  get model(): string | null {
    return this.props.model
  }

  set model(model: string | null) {
    this.props.model = model
  }

  get brand(): string | null {
    return this.props.brand
  }

  set brand(brand: string | null) {
    this.props.brand = brand
  }

  get supplier(): string | null {
    return this.props.supplier
  }

  set supplier(supplier: string | null) {
    this.props.supplier = supplier
  }

  get costPrice(): number {
    return this.props.costPrice
  }

  set costPrice(costPrice: number) {
    this.props.costPrice = costPrice
  }

  get sellingPrice(): number | null {
    return this.props.sellingPrice
  }

  set sellingPrice(sellingPrice: number | null) {
    this.props.sellingPrice = sellingPrice
  }

  get stockQuantity(): number {
    return this.props.stockQuantity
  }

  set stockQuantity(stockQuantity: number) {
    this.props.stockQuantity = stockQuantity
  }

  get location(): TPartLocation {
    return this.props.location
  }

  set location(location: TPartLocation) {
    this.props.location = location
  }

  get status(): TPartStatus {
    return this.props.status
  }

  set status(status: TPartStatus) {
    this.props.status = status
  }

  get categoryId(): string {
    return this.props.categoryId
  }

  set categoryId(categoryId: string) {
    this.props.categoryId = categoryId
  }

  get trailerId(): string | null {
    return this.props.trailerId
  }

  set trailerId(trailerId: string | null) {
    this.props.trailerId = trailerId
  }

  get axleId(): string | null {
    return this.props.axleId
  }

  set axleId(axleId: string | null) {
    this.props.axleId = axleId
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt
  }
}