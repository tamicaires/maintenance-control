import { TypeOfMaintenance } from "src/core/enum/type-of-maintenance.enum"

export interface IHourlyData {
  hour: string
  count: number
}


export interface ICategoryCount {
  category: string
  count: number
}

export type MaintenanceTypeCounts = {
  [key in keyof typeof TypeOfMaintenance]: number;
}
