import { TServiceAssigmentStatus } from "src/core/enum/service-assigment-status";

export type ChangeStatusType = {
  serviceAssignmentId: string;
  status: TServiceAssigmentStatus;
  startAt: Date | null;
  endAt: Date | null;
}

export type ChangeStatusResponseType = {
  serviceAssignmentId: string;
  status: TServiceAssigmentStatus;
  startAt: Date | null;
  endAt: Date | null;
}