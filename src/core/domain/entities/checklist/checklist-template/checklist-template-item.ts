import { z } from "zod";
import { randomUUID } from "crypto";

export class ChecklistTemplateItem implements ChecklistTemplateItemType {
  id: string;
  description: string;
  weight: number;
  checklistCategoryId: string;
  templateId: string;
  createdAt: Date
  updatedAt: Date

  constructor(data: ChecklistTemplateItemType) {
    this.id = data.id ?? randomUUID();
    Object.assign(this, data);
  }
}

const schema = z.object({
  id: z.string().uuid().optional(),
  description: z.string(),
  weight: z.number(),
  checklistCategoryId: z.string().uuid(),
  templateId: z.string().uuid(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date())
})

export type ChecklistTemplateItemType = z.infer<typeof schema>;