import { z } from "zod";
import { randomUUID } from "crypto";

export class ChecklistItem implements ChecklistItemType {
  id: string;
  checklistId: string;
  itemTemplateId: string;
  isConform: boolean;
  createdAt: Date
  updatedAt: Date

  constructor(data: ChecklistItemType) {
    this.id = data.id ?? randomUUID();
    Object.assign(this, data);
  }
}

const schema = z.object({
  id: z.string().uuid().optional(),
  checklistId: z.string().uuid(),
  itemTemplateId: z.string().uuid(),
  isConform: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date())
})

export type ChecklistItemType = z.infer<typeof schema>;