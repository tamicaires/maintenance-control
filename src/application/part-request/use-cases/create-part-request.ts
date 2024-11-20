import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { PartRequest } from "src/core/domain/entities/part-request";
import { PartRequestRepository } from "src/core/domain/repositories/part-request-repository";
import { TRequestStatus } from "src/core/enum/part-request";

interface CreatePartRequestProps {
  partId: string;
  requestedById: string;
  requestedForEmployeeId: string | null;
  handledById: string | null;
  quantity: number;
  status: TRequestStatus;
  axleId: string | null;
  trailerId: string | null;
  workOrderId: string;
}

@Injectable()
export class CreatePartRequest {
  constructor(private readonly partRequestRepository: PartRequestRepository) { }

  async execute(companyInstance: CompanyInstance, data: CreatePartRequestProps): Promise<PartRequest> {
    const partRequest = new PartRequest(data);
    await this.partRequestRepository.create(companyInstance, partRequest);

    return Promise.resolve(partRequest);
  }
}