import { RoleAssignment } from "../entities/RoleAssignment";

export abstract class RoleAssignmentRepository {
  abstract create(roleAssignment: RoleAssignment): Promise<void>;
  abstract findRoleAssignmentById(id: string): Promise<RoleAssignment | null>;
  abstract createMany(roleAssignments: RoleAssignment[]): Promise<void>;
}