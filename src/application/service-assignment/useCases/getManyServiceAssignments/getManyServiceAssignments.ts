import { Injectable } from '@nestjs/common';
import { ServiceAssignmentRepository } from 'src/core/domain/repositories/service-assignment-repository';

interface GetManyServiceAssignmentsRequest {
  page?: string;
  perPage?: string;
}

@Injectable()
export class GetManyServiceAssignments {
  constructor(
    private serviceAssignmentRepository: ServiceAssignmentRepository,
  ) {}

  async execute({ page, perPage }: GetManyServiceAssignmentsRequest) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PERPAGE = 20;

    const currentPage = Number(page) || DEFAULT_PAGE;
    const currentPerPage = Number(perPage) || DEFAULT_PERPAGE;

    const serviceAssignments = await this.serviceAssignmentRepository.findMany(
      currentPage,
      currentPerPage,
    );

    return serviceAssignments;
  }
}
