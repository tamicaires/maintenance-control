import { HttpStatus, Injectable } from "@nestjs/common";
import { RequestStatus } from "@prisma/client";
import { CompanyInstance } from "src/core/company/company-instance";
import { PartRequestRepository } from "src/core/domain/repositories/part-request-repository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";
import { IApprovePartRequestInput } from "src/shared/types/part-request/approve-part-request";
import { ApprovePartRequestDTO } from "../dto/approve-part-request-dto";
import { PartRepository } from "src/core/domain/repositories/part-repository";

@Injectable()
export class ApprovePartRequest {
  constructor(
    private readonly partRequestRepository: PartRequestRepository,
    private readonly partRepository: PartRepository
  ) { }

  async execute(companyInstance: CompanyInstance, data: IApprovePartRequestInput) {
    const partRequest = await this.partRequestRepository.findById(
      companyInstance,
      data.partRequestId
    );

    if (!partRequest) {
      throw new ExceptionHandler({
        message: "Solicitação de peça não encontrada",
        status: HttpStatus.NOT_FOUND
      });
    }

    if (partRequest.status === RequestStatus.APPROVED) {
      throw new ExceptionHandler({
        message: "Solicitação de peça já aprovada",
        status: HttpStatus.BAD_REQUEST
      });
    }

    if (partRequest.status !== RequestStatus.PENDING) {
      throw new ExceptionHandler({
        message: "Solicitação de peça não está pendente",
        status: HttpStatus.BAD_REQUEST
      });
    }

    const part = await this.partRepository.findById(partRequest.partId);

    if (!part) {
      throw new ExceptionHandler({
        message: "Peça não encontrada",
        status: HttpStatus.NOT_FOUND
      });
    }

    if (part.stockQuantity < data.approvedQuantity) {
      throw new ExceptionHandler({
        message: "Quantidade aprovada maior que a quantidade em estoque",
        status: HttpStatus.BAD_REQUEST
      });
    }

    const approvedPartRequest = new ApprovePartRequestDTO({
      approvedQuantity: data.approvedQuantity,
      partRequestId: data.partRequestId,
      handleById: data.handleById,
      handleAt: new Date(),
      status: RequestStatus.APPROVED,
      partId: part.id,
      stockQuantity: part.stockQuantity - data.approvedQuantity
    });

    await this.partRequestRepository.approve(companyInstance, approvedPartRequest);

    return approvedPartRequest;
  }
}
