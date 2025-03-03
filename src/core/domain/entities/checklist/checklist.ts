import { z } from "zod";
import { randomUUID } from "crypto";
import { ChecklistStatus, TChecklistStatus } from "src/core/enum/checklist";

export class Checklist implements ChecklistType {
  id: string;
  workOrderId: string;
  templateId: string;
  startAt: Date | null;
  endAt: Date | null;
  isCanceled: boolean;
  status: TChecklistStatus
  createdAt: Date
  updatedAt: Date

  constructor(data: ChecklistType) {
    this.id = data.id ?? randomUUID();
    Object.assign(this, data);
  }
}

const schema = z.object({
  id: z.string().uuid().optional(),
  workOrderId: z.string().uuid(),
  templateId: z.string().uuid(),
  startAt: z.date().nullable(),
  endAt: z.date().nullable(),
  status: z.enum(Object.values(ChecklistStatus) as [TChecklistStatus, ...TChecklistStatus[]]),
  isCanceled: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date())
})

export type ChecklistType = z.infer<typeof schema>;