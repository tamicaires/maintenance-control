import { Injectable } from "@nestjs/common"
import { CompanyInstance } from "src/core/company/company-instance"
import { WorkOrderRepository } from "src/core/domain/repositories/work-order-repository"
import { TypeOfMaintenance } from "src/core/enum/type-of-maintenance.enum"
import { IUseCase } from "src/shared/protocols/use-case"

export interface TypeMaintenanceChartData {
  todayCounts: MaintenanceTypeCounts
  yesterdayPreventiveCount: number
}

export type MaintenanceTypeCounts = Record<TypeOfMaintenance, number>

@Injectable()
export class GetTypeMaintenanceChartData implements IUseCase<void, TypeMaintenanceChartData> {
  constructor(private workOrderChartRepository: WorkOrderRepository) { }

  async execute(companyInstance: CompanyInstance): Promise<TypeMaintenanceChartData> {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const [todayData, yesterdayData] = await Promise.all([
      this.workOrderChartRepository.getTypeMaintenanceChartData(companyInstance, today),
      this.workOrderChartRepository.getTypeMaintenanceChartData(companyInstance, yesterday),
    ])

    const todayCounts: MaintenanceTypeCounts = todayData.reduce(
      (acc, data) => {
        return {
          ...acc,
          [data.typeOfMaintenance as TypeOfMaintenance]: data._count.id,
        }
      },
      {
        [TypeOfMaintenance.Preventiva]: 0,
        [TypeOfMaintenance.Corretiva]: 0,
        [TypeOfMaintenance.Preditiva]: 0,
      },
    )

    const yesterdayPreventiveCount =
      yesterdayData.find((data) => data.typeOfMaintenance === TypeOfMaintenance.Preventiva)?._count.id || 0

    return {
      todayCounts,
      yesterdayPreventiveCount,
    }
  }
}

