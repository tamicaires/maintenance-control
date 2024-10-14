export enum SubjectEnum {
  Company = 'Company',
  User = 'User',
  Project = 'Project',
  Fleet = 'Fleet',
  Carrier = 'Carrier',
  Service = 'Service',
}

export type TSubject = keyof typeof SubjectEnum;