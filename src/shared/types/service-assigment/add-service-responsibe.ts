import { TRequestStatus } from "src/core/enum/part-request";

export interface IAddServiceResponsibleInput {
  employeeId: string;
  workOrderId: string;
  serviceAssigmentId: string;
}

export interface IAddServiceResponsible {
  employeeId: string;
  workOrderId: string;
  serviceAssigmentId: string;
}

