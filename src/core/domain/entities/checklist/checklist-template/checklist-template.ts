import { z } from "zod";
import { randomUUID } from "crypto";

export class ChecklistTemplate implements ChecklistTemplateType {
  id: string;
  name: string;
  companyId: string;
  icon: string | null;
  createdAt: Date
  updatedAt: Date

  constructor(data: ChecklistTemplateType) {
    this.id = data.id ?? randomUUID();
    Object.assign(this, data);
  }
}

const schema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  companyId: z.string().uuid(),
  icon: z.string().nullable(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date())
})

export type ChecklistTemplateType = z.infer<typeof schema>;