import { randomUUID } from "crypto";
import { z } from "zod";

export class EmployeeServiceAssigment implements EmployeeServiceAssigmentType {
  id?: string;
  serviceAssignmentId: string;
  employeeId: string;
  createdAt: Date
  updatedAt: Date

  constructor(data: EmployeeServiceAssigmentType) {
    Object.assign(this, data);
    this.id = data.id ?? randomUUID();
  }
}

export const schema = z.object({
  id: z.string().uuid().optional(),
  serviceAssignmentId: z.string().uuid(),
  employeeId: z.string().uuid(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date())

})

type EmployeeServiceAssigmentType = z.infer<typeof schema>;