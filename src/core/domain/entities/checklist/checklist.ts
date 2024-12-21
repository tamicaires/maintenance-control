import { z } from "zod";
import { randomUUID } from "crypto";

export class Checklist implements ChecklistType {
  id: string;
  workOrderId: string;
  templateId: string;
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
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date())
})

export type ChecklistType = z.infer<typeof schema>;