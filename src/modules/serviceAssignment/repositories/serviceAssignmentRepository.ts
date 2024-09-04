import { ServiceAssignment } from '../entities/ServiceAssignment';

export abstract class ServiceAssignmentRepository {
  abstract create(serviceAssignment: ServiceAssignment): Promise<void>;
  abstract findById(id: string): Promise<ServiceAssignment | null>;
  abstract save(serviceAssignment: ServiceAssignment): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findMany(
    page: number,
    perPage: number,
  ): Promise<ServiceAssignment[]>;
}
