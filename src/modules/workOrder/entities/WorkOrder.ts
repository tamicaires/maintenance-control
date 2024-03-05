import { Replace } from "src/utils/replace";
import { Box } from "../enum/box.enum";
import { MaintenanceStatus } from "../enum/maitenance-status.enum";
import { TypeOfMaintenance } from "../enum/type-of-maintenance.enum";
import { randomUUID } from "crypto";

interface WorkOrderSchema {
  severityLevel: string;
  entryQueue: Date | null;
  entryMaintenance: Date | null;
  exitMaintenance: Date | null;
  status: MaintenanceStatus;
  fleetId: string;
  userId: string;
  typeOfMaintenance: TypeOfMaintenance;
  box: Box | null;
  createdAt: Date;
  updatedAt: Date;
};

export class WorkOrder {
  private props: WorkOrderSchema;
  private _id: string;

  constructor(props: Replace<
    WorkOrderSchema, {
    entryQueue?: Date | null,
    entryMaintenance?: Date | null,
    exitMaintenance?: Date | null,
    box?: Box | null,  
    createdAt?: Date, 
    updatedAt?: Date
  }>, 
    id?: string
    ){
      this.props = {
        ...props,
        entryQueue: props.entryQueue ?? null,
        entryMaintenance: props.entryMaintenance ?? null,
        exitMaintenance: props.exitMaintenance ?? null,
        box: props.box ?? null,
        createdAt: props.createdAt || new Date(),
        updatedAt: new Date()
      };
      this._id = id || randomUUID();
    }

  get id(): string {
    return this._id;
  };

  get severityLevel(): string {
    return this.props.severityLevel;
  };

  set severityLevel(severityLevel: string) {
    this.props.severityLevel = severityLevel;
  };

  get entryQueue(): Date | null {
    return this.props.entryQueue;
  };

  set entryQueue(entryQueue: Date | null) {
    this.props.entryQueue = entryQueue;
  };

  get entryMaintenance(): Date | null {
    return this.props.entryMaintenance;
  };

  set entryMaintenance(entryMaintenance: Date | null) {
    this.props.entryMaintenance = entryMaintenance;
  };

  get exitMaintenance(): Date | null {
    return this.props.exitMaintenance;
  };

  set exitMaintenance(exitMaintenance: Date | null) {
    this.props.exitMaintenance = exitMaintenance;
  };

  get status(): MaintenanceStatus {
    return this.props.status;
  };

  set status(status: MaintenanceStatus) {
    this.props.status = status;
  };

  get userId(): string {
    return this.props.userId;
  };

  set userId(userId: string) {
    this.props.userId = userId;
  };

  get fleetId(): string {
    return this.props.fleetId;
  };

  set fleetId(fleetId: string) {
    this.props.fleetId = fleetId;
  };

  get typeOfMaintenance(): TypeOfMaintenance {
    return this.props.typeOfMaintenance;
  };

  set typeOfMaintenance(typeOfMaintenance: TypeOfMaintenance) {
    this.props.typeOfMaintenance = typeOfMaintenance;
  };

  get box(): Box | null{
    return this.props.box;
  };

  set box(box: Box | null) {
    this.props.box = box;
  };

  get createdAt(): Date {
    return this.props.createdAt;
  };

  get updatedAt(): Date {
    return this.props.updatedAt;
  };

  set updatedAt(updatedAt : Date) {
    this.props.updatedAt = updatedAt
  };

};