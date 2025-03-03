import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { Event } from "src/core/domain/entities/event";
import { EventRepository } from "src/core/domain/repositories/event";
import { EventActionEnum } from "src/core/enum/event";
import { SubjectEnum } from "src/core/enum/subject.enum";
import { IUseCase } from "src/shared/protocols/use-case";

export interface IGetEventsRequest {
  workOrderId?: string;
  checklistId?: string;
  page?: string;
  perPage?: string;
  event?: EventActionEnum;
  subject?: SubjectEnum;
  startDate?: string;
  endDate?: string;
}
@Injectable()
export class ListEvents implements IUseCase<IGetEventsRequest, Event[]> {
  constructor(
    private readonly _eventRepository: EventRepository,
  ) { }

  async execute(companyInstance: CompanyInstance, queries: IGetEventsRequest): Promise<Event[]> {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PERPAGE = 20;

    const currentPage = Number(queries.page) || DEFAULT_PAGE;
    const currentPerPage = Number(queries.perPage) || DEFAULT_PERPAGE;

    const filters = {
      event: queries.event || undefined,
      subject: queries.subject || undefined,
      startDate: queries.startDate ? new Date(queries.startDate) : undefined,
      endDate: queries.endDate ? new Date(queries.endDate) : undefined,
    };

    return this._eventRepository.getEvents(companyInstance, currentPage, currentPerPage, filters, queries.checklistId);
  }
}