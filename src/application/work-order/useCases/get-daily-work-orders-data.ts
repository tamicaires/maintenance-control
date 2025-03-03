import { Injectable } from "@nestjs/common"
import { CompanyInstance } from "src/core/company/company-instance"
import { WorkOrder } from "src/core/domain/entities/work-order"
import { WorkOrderRepository } from "src/core/domain/repositories/work-order-repository"
import { MaintenanceStatus } from "src/core/enum/maitenance-status.enum"
import { TypeOfMaintenance } from "src/core/enum/type-of-maintenance.enum"
import { IUseCase } from "src/shared/protocols/use-case"
import { Filters } from "src/shared/types/filters.interface"
import { WorkOrderDailyView } from "src/shared/types/work-order"
import { calculateDuration } from "src/shared/utils/workOrderUtils"

export interface IRequest {
  status?: MaintenanceStatus
  startDate: string
  endDate: string
}

interface Metric {
  value: number
  change: number
}

export interface DailyWorkOrdersData {
  workOrders: WorkOrderDailyView[]
  statistics: {
    countFrotasEmFila: number
    countFrotasEmManutencao: number
    countFinalizadas: number
    mediaTempoFila: number
    mediaTempoPreventiva: number
    mediaTempoCorretiva: number
    queueCount: Metric
    avgQueueTime: Metric
    avgPVTime: Metric
    avgCOTime: Metric
    releasedCount: Metric
  }
}

@Injectable()
export class GetDailyWorkOrdersData implements IUseCase<IRequest, DailyWorkOrdersData> {
  constructor(private readonly workOrderRepository: WorkOrderRepository) { }

  async execute(companyInstance: CompanyInstance, data: IRequest): Promise<DailyWorkOrdersData> {
    const startDate = new Date(data.startDate)
    const endDate = new Date(data.endDate)

    const filters: Filters<MaintenanceStatus> = {
      status: data.status,
    }

    const workOrders = await this.workOrderRepository.getDaily(
      companyInstance,
      startDate,
      endDate,
      data.status
    )

    const twoHoursAgo = new Date(endDate.getTime() - 2 * 60 * 60 * 1000)
    const currentMetrics = this.calculateMetrics(workOrders, endDate)
    const pastMetrics = this.calculateMetrics(
      workOrders.filter((order) => new Date(order.createdAt) < twoHoursAgo),
      twoHoursAgo,
    )

    const baseStatistics = this.calculateStatistics(workOrders, endDate)
    const comparativeMetrics = this.calculateComparativeMetrics(currentMetrics, pastMetrics)

    const statistics: DailyWorkOrdersData["statistics"] = {
      ...baseStatistics,
      ...comparativeMetrics,
    }

    return {
      workOrders,
      statistics,
    }
  }

  private calculateStatistics(
    workOrders: WorkOrder[],
    currentDate: Date,
  ): Omit<
    DailyWorkOrdersData["statistics"],
    "queueCount" | "avgQueueTime" | "avgPVTime" | "avgCOTime" | "releasedCount"
  > {
    const statusCounts = {
      [MaintenanceStatus.Fila]: 0,
      [MaintenanceStatus.Manutencao]: 0,
      [MaintenanceStatus.Finalizada]: 0,
    }

    let totalQueueTime = 0
    let totalQueueCount = 0
    let preventivaTime = 0
    let preventivaCount = 0
    let corretivaTime = 0
    let corretivaCount = 0

    workOrders.forEach((workOrder) => {
      if (workOrder.status in statusCounts) {
        statusCounts[workOrder.status]++
      }

      const queueDuration = calculateDuration(workOrder.entryQueue, workOrder.entryMaintenance || currentDate) || 0
      totalQueueTime += queueDuration
      totalQueueCount++

      if (workOrder.status === MaintenanceStatus.Finalizada || workOrder.status === MaintenanceStatus.Manutencao) {
        const maintenanceDuration =
          calculateDuration(workOrder.entryMaintenance, workOrder.exitMaintenance || currentDate) || 0
        if (workOrder.typeOfMaintenance === TypeOfMaintenance.Preventiva) {
          preventivaTime += maintenanceDuration
          preventivaCount++
        } else if (workOrder.typeOfMaintenance === TypeOfMaintenance.Corretiva) {
          corretivaTime += maintenanceDuration
          corretivaCount++
        }
      }
    })

    return {
      countFrotasEmFila: statusCounts[MaintenanceStatus.Fila],
      countFrotasEmManutencao: statusCounts[MaintenanceStatus.Manutencao],
      countFinalizadas: statusCounts[MaintenanceStatus.Finalizada],
      mediaTempoFila: totalQueueCount > 0 ? totalQueueTime / totalQueueCount : 0,
      mediaTempoPreventiva: preventivaCount > 0 ? preventivaTime / preventivaCount : 0,
      mediaTempoCorretiva: corretivaCount > 0 ? corretivaTime / corretivaCount : 0,
    }
  }

  private calculateMetrics(orders: WorkOrder[], currentDate: Date) {
    const queueCount = orders.filter((order) => order.status === MaintenanceStatus.Fila).length
    const avgQueueTime = this.calculateAverageTime(orders, MaintenanceStatus.Fila, currentDate)
    const avgPVTime = this.calculateAverageTime(
      orders,
      MaintenanceStatus.Manutencao,
      currentDate,
      TypeOfMaintenance.Preventiva,
    )
    const avgCOTime = this.calculateAverageTime(
      orders,
      MaintenanceStatus.Manutencao,
      currentDate,
      TypeOfMaintenance.Corretiva,
    )
    const releasedCount = orders.filter((order) => order.status === MaintenanceStatus.Finalizada).length

    return { queueCount, avgQueueTime, avgPVTime, avgCOTime, releasedCount }
  }

  private calculateAverageTime(
    orders: WorkOrder[],
    status: MaintenanceStatus,
    currentDate: Date,
    type?: TypeOfMaintenance,
  ): number {
    const filteredOrders = orders.filter(
      (order) => order.status === status && (type ? order.typeOfMaintenance === type : true),
    )

    const totalTime = filteredOrders.reduce((sum, order) => {
      if (status === MaintenanceStatus.Fila) {
        const duration = calculateDuration(order.entryQueue, order.entryMaintenance || currentDate) || 0
        return sum + duration
      } else {
        const duration = calculateDuration(order.entryMaintenance, order.exitMaintenance || currentDate) || 0
        return sum + duration
      }
    }, 0)

    return filteredOrders.length > 0 ? totalTime / filteredOrders.length : 0
  }

  private calculateChange(current: number, past: number): number {
    return past !== 0 ? ((current - past) / past) * 100 : 0
  }

  private calculateComparativeMetrics(
    currentMetrics: ReturnType<GetDailyWorkOrdersData["calculateMetrics"]>,
    pastMetrics: ReturnType<GetDailyWorkOrdersData["calculateMetrics"]>,
  ): Pick<
    DailyWorkOrdersData["statistics"],
    "queueCount" | "avgQueueTime" | "avgPVTime" | "avgCOTime" | "releasedCount"
  > {
    return {
      queueCount: {
        value: currentMetrics.queueCount,
        change: this.calculateChange(currentMetrics.queueCount, pastMetrics.queueCount),
      },
      avgQueueTime: {
        value: currentMetrics.avgQueueTime,
        change: this.calculateChange(currentMetrics.avgQueueTime, pastMetrics.avgQueueTime),
      },
      avgPVTime: {
        value: currentMetrics.avgPVTime,
        change: this.calculateChange(currentMetrics.avgPVTime, pastMetrics.avgPVTime),
      },
      avgCOTime: {
        value: currentMetrics.avgCOTime,
        change: this.calculateChange(currentMetrics.avgCOTime, pastMetrics.avgCOTime),
      },
      releasedCount: {
        value: currentMetrics.releasedCount,
        change: this.calculateChange(currentMetrics.releasedCount, pastMetrics.releasedCount),
      },
    }
  }
}

