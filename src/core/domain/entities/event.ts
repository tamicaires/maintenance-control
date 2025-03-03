import { z } from "zod";
import { randomUUID } from "crypto";
import { EventActionEnum } from "src/core/enum/event";
import { SubjectEnum } from "src/core/enum/subject.enum";

export class Event implements EventType {
  id: string;
  event: EventActionEnum;
  subject: SubjectEnum;
  description?: string | null;
  companyId: string;
  handledById: string | null;
  handledAt: Date | null;
  fleetId?: string | null;
  trailerId?: string | null;
  vehicleId?: string | null;
  workOrderId?: string | null;
  checklistId?: string | null;
  partRequestId?: string | null;

  constructor(data: EventType) {
    this.id = data.id ?? randomUUID();
    Object.assign(this, data);
  }
}

const schema = z.object({
  id: z.string().uuid().optional(),
  event: z.nativeEnum(EventActionEnum),
  subject: z.nativeEnum(SubjectEnum),
  description: z.string().nullable().optional(),
  companyId: z.string().uuid(),
  handledById: z.string().uuid().nullable(),
  handledAt: z.date().nullable(),
  fleetId: z.string().uuid().nullable().optional(),
  trailerId: z.string().uuid().nullable().optional(),
  vehicleId: z.string().uuid().nullable().optional(),
  workOrderId: z.string().uuid().nullable().optional(),
  checklistId: z.string().uuid().nullable().optional(),
  partRequestId: z.string().uuid().nullable().optional(),
})

export type EventType = z.infer<typeof schema>;