import { Injectable } from "@nestjs/common"
import { CompanyInstance } from "src/core/company/company-instance"
import { WorkOrderRepository } from "src/core/domain/repositories/work-order-repository"
import { IUseCase } from "src/shared/protocols/use-case"
import { IHourlyData } from "src/shared/types/dashboard"
import { formatHour, getDateNHoursAgo } from "src/shared/utils/date-utils"

export interface IQueueChartData {
  hourlyData: IHourlyData[]
  totalQueueCount: number
  previousTotalQueueCount: number
  percentageChange: number
}

@Injectable()
export class GetQueueChart implements IUseCase<string, IQueueChartData> {
  constructor(private workOrderChartRepository: WorkOrderRepository) {}

  async execute(companyInstance: CompanyInstance): Promise<IQueueChartData> {
    const currentDateFormated = new Date()
    const sevenHoursAgo = getDateNHoursAgo(currentDateFormated, 7)
    const fourteenHoursAgo = getDateNHoursAgo(currentDateFormated, 14)

    const queueData = await this.workOrderChartRepository.getQueueChartData(
      companyInstance,
      fourteenHoursAgo,
      currentDateFormated,
    )

    const hourlyData = this.processHourlyData(queueData, sevenHoursAgo, currentDateFormated)
    const totalQueueCount = hourlyData.reduce((sum, data) => sum + data.count, 0)
    const previousTotalQueueCount = queueData
      .filter((data) => new Date(data.entryQueue) < sevenHoursAgo)
      .reduce((sum, data) => sum + data._count.id, 0)

    const percentageChange = this.calculatePercentageChange(totalQueueCount, previousTotalQueueCount)

    return {
      hourlyData,
      totalQueueCount,
      previousTotalQueueCount,
      percentageChange,
    }
  }

  private processHourlyData(queueData: any[], startDate: Date, endDate: Date): IHourlyData[] {
    const hourlyData = new Array(7).fill(0).map((_, index) => {
      const hour = new Date(endDate.getTime() - (6 - index) * 60 * 60 * 1000)
      return {
        hour: formatHour(hour),
        count: 0,
      }
    })

    queueData.forEach((data) => {
      const entryTime = new Date(data.entryQueue)
      if (entryTime >= startDate && entryTime <= endDate) {
        const index = hourlyData.findIndex((hourData) => hourData.hour === formatHour(entryTime))
        if (index !== -1) {
          hourlyData[index].count += data._count.id
        }
      }
    })

    return hourlyData
  }

  private calculatePercentageChange(currentValue: number, previousValue: number): number {
    if (previousValue === 0) {
      return currentValue > 0 ? 100 : 0
    }
    return ((currentValue - previousValue) / previousValue) * 100
  }
}

