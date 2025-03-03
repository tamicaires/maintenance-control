export enum ChecklistStatusEnum {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export type TChecklistStatusEnum = keyof typeof ChecklistStatusEnum;

export const ChecklistStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
} as const

export type TChecklistStatus = typeof ChecklistStatus[keyof typeof ChecklistStatus]