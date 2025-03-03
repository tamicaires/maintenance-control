import { randomUUID } from "crypto";
import { z } from "zod";

export class Trailer implements TrailerType {
  id: string;
  plate: string;
  position: number | null;
  companyId: string;
  fleetId: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: TrailerType) {
    this.id = data.id ?? randomUUID();
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = new Date();
    Object.assign(this, data);
  }
}

export const schema = z.object({
  id: z.string().uuid().optional(),
  plate: z.string(),
  position: z.number().nullable(),
  companyId: z.string().uuid(),
  fleetId: z.string().uuid().nullable(),
  isActive: z.boolean().optional().default(true),
  createdAt: z.date().default(() => new Date()).optional(),
  updatedAt: z.date().default(() => new Date()).optional()
})

export type TrailerType = z.infer<typeof schema>;