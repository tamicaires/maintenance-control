import { Event } from "src/core/domain/entities/event";
import { EventActionEnum } from "src/core/enum/event";
import { SubjectEnum } from "src/core/enum/subject.enum";

interface ChecklistRelationalData {
  id: string;
  template: {
    id: string;
    name: string;
    icon?: string | null;
  }
}

interface HandledByRelationalData {
  id: string;
  name: string;
}

interface WorkOrderRelationalData {
  id: string;
  displayId?: string | null;
}

export interface RawEvent {
  id: string;
  event: string;
  subject: string;
  description?: string | null;
  companyId: string;
  handledById: string | null;
  handledBy?: HandledByRelationalData | null;
  handledAt: Date | null;
  fleetId?: string | null;
  trailerId?: string | null;
  vehicleId?: string | null;
  workOrderId?: string | null;
  workOrder?: WorkOrderRelationalData | null;
  checklistId?: string | null;
  checklist?: ChecklistRelationalData | null;
  partRequestId?: string | null;
}

export class EventMapper {
  static toDomain(raw: RawEvent): any {
    return {
      id: raw.id,
      event: EventActionEnum[raw.event as keyof typeof EventActionEnum],
      subject: SubjectEnum[raw.subject as keyof typeof SubjectEnum],
      description: raw.description,
      companyId: raw.companyId,
      handledById: raw.handledById,
      handledBy: raw.handledBy ? { id: raw.handledBy.id, name: raw.handledBy.name } : null,
      handledAt: raw.handledAt ? new Date(raw.handledAt) : null,
      fleetId: raw.fleetId,
      trailerId: raw.trailerId,
      vehicleId: raw.vehicleId,
      workOrderId: raw.workOrderId,
      workOrder: raw.workOrder ? { id: raw.workOrder.id, displayId: raw.workOrder.displayId } : null,
      checklistId: raw.checklistId,
      partRequestId: raw.partRequestId,
      checklist: raw.checklist ?? null,
    }
  }

  static toPersistence(event: Event): any {
    return {
      id: event.id,
      event: event.event.toString(),
      subject: event.subject.toString(),
      description: event.description,
      companyId: event.companyId,
      handledById: event.handledById,
      handledAt: event.handledAt ? event.handledAt.toISOString() : null,
      fleetId: event.fleetId,
      trailerId: event.trailerId,
      vehicleId: event.vehicleId,
      workOrderId: event.workOrderId,
      checklistId: event.checklistId,
      partRequestId: event.partRequestId,
    };
  }
}
