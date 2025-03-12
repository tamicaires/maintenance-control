export enum MaintenanceStatus {
  Fila = 'Fila',
  Manutencao = 'Manutencao',
  AguardandoPeca = 'AguardandoPeca',
  Finalizada = 'Finalizada',
  Cancelada = 'Cancelada',
}

export type TMaintenanceStatus = typeof MaintenanceStatus[keyof typeof MaintenanceStatus]