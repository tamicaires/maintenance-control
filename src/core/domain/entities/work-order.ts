import { Replace } from 'src/shared/utils/replace';
import { Box } from '../../enum/box.enum';
import { MaintenanceStatus } from '../../enum/maitenance-status.enum';
import { TypeOfMaintenance } from '../../enum/type-of-maintenance.enum';
import { randomUUID } from 'crypto';

interface WorkOrderSchema {
  displayId: string | null;
  severityLevel: string;
  entryQueue: Date | null;
  entryMaintenance: Date | null;
  exitMaintenance: Date | null;
  startWaitingParts: Date | null;
  endWaitingParts: Date | null;
  queueDuration: number | null;
  maintenanceDuration: number | null;
  waitingPartsDuration: number | null;
  exitSupervisor: string | null;
  status: MaintenanceStatus;
  fleetId: string;
  userId: string;
  companyId: string;
  typeOfMaintenance: TypeOfMaintenance;
  boxId: string | null;
  isCancelled: boolean;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class WorkOrder {
  private props: WorkOrderSchema;
  private _id: string;

  constructor(
    props: Replace<
      WorkOrderSchema,
      {
        displayId: string | null;
        entryQueue?: Date | null;
        entryMaintenance?: Date | null;
        exitMaintenance?: Date | null;
        startWaitingParts?: Date | null;
        endWaitingParts?: Date | null;
        queueDuration?: number | null;
        maintenanceDuration?: number | null;
        waitingPartsDuration?: number | null;
        exitSupervisor?: string | null;
        box?: Box | null;
        createdBy?: string | null;
        updatedBy?: string | null;
        createdAt?: Date;
        updatedAt?: Date;
      }
    >,
    id?: string,
  ) {
    this.props = {
      ...props,
      displayId: props.displayId ?? null,
      entryQueue: props.entryQueue ?? null,
      entryMaintenance: props.entryMaintenance ?? null,
      exitMaintenance: props.exitMaintenance ?? null,
      startWaitingParts: props.startWaitingParts ?? null,
      endWaitingParts: props.endWaitingParts ?? null,
      queueDuration: props.queueDuration ?? null,
      maintenanceDuration: props.maintenanceDuration ?? null,
      waitingPartsDuration: props.waitingPartsDuration ?? null,
      exitSupervisor: props.exitSupervisor ?? null,
      boxId: props.box ?? null,
      createdBy: props.createdBy ?? null,
      updatedBy: props.updatedBy ?? null,
      createdAt: props.createdAt || new Date(),
      updatedAt: new Date(),
    };

    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get displayId(): string | null {
    return this.props.displayId;
  }

  get severityLevel(): string {
    return this.props.severityLevel;
  }

  set severityLevel(severityLevel: string) {
    this.props.severityLevel = severityLevel;
  }

  get entryQueue(): Date | null {
    return this.props.entryQueue;
  }

  set entryQueue(entryQueue: Date | null) {
    this.props.entryQueue = entryQueue;
  }

  get entryMaintenance(): Date | null {
    return this.props.entryMaintenance;
  }

  set entryMaintenance(entryMaintenance: Date | null) {
    this.props.entryMaintenance = entryMaintenance;
  }

  get exitMaintenance(): Date | null {
    return this.props.exitMaintenance;
  }

  set exitMaintenance(exitMaintenance: Date | null) {
    this.props.exitMaintenance = exitMaintenance;
  }

  get startWaitingParts(): Date | null {
    return this.props.startWaitingParts;
  }

  set startWaitingParts(startWaitingParts: Date | null) {
    this.props.startWaitingParts = startWaitingParts;
  }

  get endWaitingParts(): Date | null {
    return this.props.endWaitingParts;
  }

  set endWaitingParts(endWaitingParts: Date | null) {
    this.props.endWaitingParts = endWaitingParts;
  }

  get queueDuration(): number | null {
    return this.props.queueDuration;
  }

  set queueDuration(queueDuration: number | null) {
    this.props.queueDuration = queueDuration;
  }

  get maintenanceDuration(): number | null {
    return this.props.maintenanceDuration;
  }

  set maintenanceDuration(maintenanceDuration: number | null) {
    this.props.maintenanceDuration = maintenanceDuration;
  }

  get waitingPartsDuration(): number | null {
    return this.props.waitingPartsDuration;
  }

  set waitingPartsDuration(waitingPartsDuration: number | null) {
    this.props.waitingPartsDuration = waitingPartsDuration;
  }

  get exitSupervisor(): string | null {
    return this.props.exitSupervisor;
  }

  set exitSupervisor(exitSupervisor: string | null) {
    this.props.exitSupervisor = exitSupervisor;
  }

  get status(): MaintenanceStatus {
    return this.props.status;
  }

  set status(status: MaintenanceStatus) {
    this.props.status = status;
  }

  get userId(): string {
    return this.props.userId;
  }

  set userId(userId: string) {
    this.props.userId = userId;
  }

  get companyId(): string {
    return this.props.companyId;
  }

  set companyId(companyId: string) {
    this.props.companyId = companyId;
  }

  get fleetId(): string {
    return this.props.fleetId;
  }

  set fleetId(fleetId: string) {
    this.props.fleetId = fleetId;
  }

  get typeOfMaintenance(): TypeOfMaintenance {
    return this.props.typeOfMaintenance;
  }

  set typeOfMaintenance(typeOfMaintenance: TypeOfMaintenance) {
    this.props.typeOfMaintenance = typeOfMaintenance;
  }

  get boxId(): string | null {
    return this.props.boxId;
  }

  set boxId(boxId: string | null) {
    this.props.boxId = boxId;
  }

  get isCancelled(): boolean {
    return this.props.isCancelled;
  }

  set isCancelled(isCancelled: boolean) {
    this.props.isCancelled = isCancelled;
  }

  get createdBy(): string | null {
    return this.props.createdBy;
  }

  get updatedBy(): string | null {
    return this.props.updatedBy;
  }

  set updatedBy(updatedBy: string | null) {
    this.props.updatedBy = updatedBy;
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
