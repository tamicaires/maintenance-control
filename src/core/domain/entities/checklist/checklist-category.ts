import { randomUUID } from "crypto";
import { z } from "zod";

export class ChecklistCategory implements ChecklistCategoryType {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date
  updatedAt: Date

  constructor(data: ChecklistCategoryType) {
    this.id = data.id ?? randomUUID();
    Object.assign(this, data);
  }
}
export const schema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date())
})

export type ChecklistCategoryType = z.infer<typeof schema>;