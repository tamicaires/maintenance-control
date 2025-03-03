import { CompanyInstance } from "src/core/company/company-instance";
import { Event } from "../entities/event";
import { IEventRegisterRequest } from "src/application/event/use-cases/register-event";
import { MaintenanceFilters, IEventFilters } from "src/shared/types/filters.interface";

export abstract class EventRepository {
  abstract register(companyInstance: CompanyInstance, data: Event): Promise<Event>;
  abstract findById(companyInstance: CompanyInstance, eventId: string): Promise<Event | null>;
  abstract getEvents(
    companyInstance: CompanyInstance,
    page: number,
    perPage: number,
    filters?: IEventFilters,
    checklistId?: string
  ): Promise<Event[]>;
  abstract getByWorkOrder(companyInstance: CompanyInstance, workOrderId: string): Promise<Event[]>
  abstract delete(companyInstance: CompanyInstance, eventId: string): Promise<void>;

}