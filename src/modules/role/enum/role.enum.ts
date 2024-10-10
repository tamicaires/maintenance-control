export enum RoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
  // GENERAL_MANAGER = 'GENERAL MANAGER',
  // MAINTENANCE_CONSULTER = 'maintenance consulter',
  // MAINTENANCE_MANAGER = 'maintenance manager',
  // TIRE_CONSULTER = 'tire consulter',
  // TIRE_MANAGER = 'tire manager',
  // PARTS_CONSULTER = 'parts consulter',
  // PARTS_MANAGER = 'parts manager',
}

export type TRole = keyof typeof RoleEnum;