import { randomUUID } from "crypto";
import { TRequestStatus } from "src/core/enum/part-request";
import { Replace } from "src/shared/utils/replace";

interface PartRequestSchema {
  partId: string;
  requestedById: string;
  requestedForEmployeeId: string | null;
  handledById: string | null;
  quantity: number;
  approvedQuantity: number | null;
  status: TRequestStatus;
  rejectionReason: string | null;
  requestedAt: Date;
  handledAt: Date | null;
  deliveredAt: Date | null;
  workOrderId: string | null;
  updatedAt: Date;
}
export class PartRequest {
  private props: PartRequestSchema;
  private _id: string;

  constructor(
    props: Replace<PartRequestSchema, {
      requestedForEmployeeId?: string | null,
      handledById?: string | null,
      approvedQuantity?: number | null,
      rejectionReason?: string | null,
      handledAt?: Date | null,
      deliveredAt?: Date | null,
      workOrderId?: string | null,
      requestedAt?: Date,
      updatedAt?: Date,
    }>,
    id?: string,
  ) {
    this.props = {
      ...props,
      requestedForEmployeeId: props.requestedForEmployeeId ?? null,
      handledById: props.handledById ?? null,
      approvedQuantity: props.approvedQuantity ?? null,
      rejectionReason: props.rejectionReason ?? null,
      handledAt: props.handledAt ?? null,
      deliveredAt: props.deliveredAt ?? null,
      workOrderId: props.workOrderId ?? null,
      requestedAt: props.requestedAt ?? new Date(),
      updatedAt: new Date(),
    };

    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get partId(): string {
    return this.props.partId;
  }

  set partId(partId: string) {
    this.props.partId = partId;
  }

  get requestedById(): string {
    return this.props.requestedById;
  }

  set requestedById(requestedById: string) {
    this.props.requestedById = requestedById;
  } 

  get requestedForEmployeeId(): string | null {
    return this.props.requestedForEmployeeId;
  }

  set requestedForEmployeeId(requestedForEmployeeId: string | null) {
    this.props.requestedForEmployeeId = requestedForEmployeeId;
  }

  get handledById(): string | null {
    return this.props.handledById;
  } 

  set handledById(handledById: string | null) {
    this.props.handledById = handledById;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  set quantity(quantity: number) {
    this.props.quantity = quantity;
  }

  get approvedQuantity(): number | null {
    return this.props.approvedQuantity;
  }

  set approvedQuantity(approvedQuantity: number | null) {
    this.props.approvedQuantity = approvedQuantity;
  }

  get status(): TRequestStatus {
    return this.props.status;
  }

  set status(status: TRequestStatus) {
    this.props.status = status;
  }

  get rejectionReason(): string | null {
    return this.props.rejectionReason;
  }

  set rejectionReason(rejectionReason: string | null) {
    this.props.rejectionReason = rejectionReason;
  } 

  get requestedAt(): Date {
    return this.props.requestedAt;
  }

  set requestedAt(requestedAt: Date) {
    this.props.requestedAt = requestedAt;
  }

  get handledAt(): Date | null {
    return this.props.handledAt;
  }

  set handledAt(handledAt: Date | null) {
    this.props.handledAt = handledAt;
  }

  get deliveredAt(): Date | null {
    return this.props.deliveredAt;
  }

  set deliveredAt(deliveredAt: Date | null) {
    this.props.deliveredAt = deliveredAt;
  }

  get workOrderId(): string | null {
    return this.props.workOrderId;
  }

  set workOrderId(workOrderId: string | null) {
    this.props.workOrderId = workOrderId;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}