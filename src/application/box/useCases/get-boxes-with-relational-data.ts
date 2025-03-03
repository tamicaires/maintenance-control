import { Injectable } from '@nestjs/common';
import { CompanyInstance } from 'src/core/company/company-instance';
import { BoxRepository } from 'src/core/domain/repositories/box-repository';
import { ServiceAssigmentStatus } from 'src/core/enum/service-assigment-status';
import { IUseCase } from 'src/shared/protocols/use-case';
import { calculateProgress } from 'src/shared/utils/commonUtils';

@Injectable()
export class GetBoxesWithRelationalData implements IUseCase<any, any> {
  constructor(private readonly _boxRepository: BoxRepository) { }

  async execute(
    companyInstance: CompanyInstance,
  ): Promise<any> {
    const boxesWithRelationalData =
      await this._boxRepository.getWithRelationalData(
        companyInstance,
      );

    const dataWithProgress = boxesWithRelationalData.map((box) => ({
      ...box,
      workOrder: box.workOrder[0],
      progress: box.workOrder[0]
        ? this.calculateWorkOrderProgress(box.workOrder[0].serviceAssignments)
        : 0
    }));

    return dataWithProgress;
  }

  private calculateWorkOrderProgress(serviceAssignments: any[]): number {
    return calculateProgress(serviceAssignments, (assignment) =>
      [ServiceAssigmentStatus.COMPLETED].includes(assignment.status),
    );
  }
}
