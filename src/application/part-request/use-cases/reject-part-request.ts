import { HttpStatus, Injectable } from "@nestjs/common";
import { RequestStatus } from "@prisma/client";
import { CompanyInstance } from "src/core/company/company-instance";
import { PartRequestRepository } from "src/core/domain/repositories/part-request-repository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";
import { IRejectPartRequestInput } from "src/shared/types/part-request/reject-part-request";
import { RejectPartRequestDTO } from "../dto/reject-part-request-dto";

@Injectable()
export class RejectPartRequest {
  constructor(private readonly partRequestRepository: PartRequestRepository) { }

  async execute(companyInstance: CompanyInstance, data: IRejectPartRequestInput) {
    const partRequest = await this.partRequestRepository.findById(companyInstance, data.partRequestId);
    console.log("partRequest", partRequest)
    if (!partRequest) {
      throw new ExceptionHandler({
        message: "Solicitação de peça não encontrada",
        status: HttpStatus.NOT_FOUND
      })
    }

    if (partRequest.status === RequestStatus.REJECTED) {
      throw new ExceptionHandler({
        message: "Solicitação de peça já rejeitada",
        status: HttpStatus.BAD_REQUEST
      })
    }

    if (partRequest.status !== RequestStatus.PENDING) {
      throw new ExceptionHandler({
        message: "Solicitação de peça não está pendente",
        status: HttpStatus.BAD_REQUEST
      })
    }

    const rejectedPartRequest = new RejectPartRequestDTO({
      partRequestId: data.partRequestId,
      rejectionReason: data.rejectionReason,
      handleById: data.handleById,
      handleAt: new Date(),
      status: RequestStatus.REJECTED
    })
    
    this.partRequestRepository.reject(
      companyInstance,
      rejectedPartRequest
    )
    return rejectedPartRequest;
  }
}