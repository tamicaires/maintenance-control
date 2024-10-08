import { ServiceAssignment } from '../entities/ServiceAssignment';
import { ServiceAssignmentRepository } from './serviceAssignmentRepository';

export class ServiceAssignmentRepositoryInMemory
  implements ServiceAssignmentRepository
{
  public serviceAssignments: ServiceAssignment[] = [];

  async create(serviceAssignment: ServiceAssignment): Promise<void> {
    this.serviceAssignments.push(serviceAssignment);
  }

  async findById(id: string): Promise<ServiceAssignment | null> {
    const serviceAssignment = this.serviceAssignments.find(
      (serviceAssignment) => serviceAssignment.id === id,
    );

    if (!serviceAssignment) return null;

    return serviceAssignment;
  }

  async save(serviceAssignment: ServiceAssignment): Promise<void> {
    const serviceAssignmentIndex = this.serviceAssignments.findIndex(
      (currentServiceAssignment) =>
        currentServiceAssignment.id === serviceAssignment.id,
    );

    if (serviceAssignmentIndex > 0) {
      this.serviceAssignments[serviceAssignmentIndex] = serviceAssignment;
    }
  }

  async delete(id: string): Promise<void> {
    this.serviceAssignments = this.serviceAssignments.filter(
      (serviceAssignments) => serviceAssignments.id !== id,
    );
  }

  async findMany(page: number, perPage: number): Promise<ServiceAssignment[]> {
    return this.serviceAssignments.slice((page - 1) * perPage, page * perPage);
  }
}
