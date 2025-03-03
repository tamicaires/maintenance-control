import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { PartRequest } from "src/core/domain/entities/part-request";
import { PartRequestRepository } from "src/core/domain/repositories/part-request-repository";
import { WorkOrderRepository } from "src/core/domain/repositories/work-order-repository";
import { TRequestStatus } from "src/core/enum/part-request";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";
import { PartRepository } from "src/core/domain/repositories/part-repository";

interface CreatePartRequestProps {
  partId: string;
  requestedForEmployeeId: string | null;
  quantity: number;
  status: TRequestStatus;
  axleId: string | null;
  trailerId: string | null;
  workOrderId: string;
}

@Injectable()
export class CreatePartRequestBatch {
  constructor(
    private readonly partRequestRepository: PartRequestRepository,
    private readonly partRepository: PartRepository,
    private readonly workOrderRepository: WorkOrderRepository,
  ) { }

  async execute(
    companyInstance: CompanyInstance,
    requestedById: string,
    batchData: CreatePartRequestProps[]
  ): Promise<PartRequest[]> {
    const firstWorkOrderId = batchData[0]?.workOrderId;

    await this.validateBatch(batchData, firstWorkOrderId, companyInstance);

    const partRequests = batchData.map((data) =>
      this.createPartRequest(data, requestedById)
    );

    const createdPartRequests = await this.partRequestRepository.createBatch(
      partRequests
    );

    // // Após o sucesso, registrar os eventos
    // await Promise.all(
    //   createdPartRequests.map((partRequest) =>
    //     this.eventService.registerEvent(companyInstance, {
    //       event: EventActionEnum.Requested,
    //       subject: SubjectEnum.Part_Request,
    //       description: partRequest.id,
    //       handledAt: new Date(),
    //       workOrderId: partRequest.workOrderId,
    //       handledById: requestedById,
    //     })
    //   )
    // );

    return createdPartRequests;
  }

  private async validateBatch(
    batchData: CreatePartRequestProps[],
    firstWorkOrderId: string,
    companyInstance: CompanyInstance
  ): Promise<void> {
    for (const data of batchData) {
      if (data.workOrderId !== firstWorkOrderId) {
        throw new ExceptionHandler({
          message:
            "Todos os itens de solicitação de peças devem pertencer à mesma ordem de serviço",
          status: 400,
        });
      }

      // const part = await this.partRepository.findById()
      const workOrder = await this.workOrderRepository.findById(
        companyInstance,
        data.workOrderId
      );
      if (!workOrder) {
        throw new ExceptionHandler({
          message: "Ordem de serviço não encontrada",
          status: 404,
        });
      }
    }
  }

  private createPartRequest(
    data: CreatePartRequestProps,
    requestedById: string
  ): PartRequest {
    return new PartRequest({
      ...data,
      requestedById: requestedById,
    });
  }
}
