import { Injectable } from "@nestjs/common"
import { CompanyInstance } from "src/core/company/company-instance";
import { Event } from "src/core/domain/entities/event";
import { EventRepository } from "src/core/domain/repositories/event";
import { EventActionEnum } from "src/core/enum/event";
import { SubjectEnum } from "src/core/enum/subject.enum";
import { IUseCase } from "src/shared/protocols/use-case";

export interface IEventRegisterRequest {
  event: EventActionEnum;
  subject: SubjectEnum;
  description: string;
  handledById: string | null;
  handledAt: Date | null;
  fleetId?: string | null;
  trailerId?: string | null;
  vehicleId?: string | null;
  workOrderId?: string | null;
  checklistId?: string | null;
  partRequestId?: string | null;
}

@Injectable()
export class RegisterEvent implements IUseCase<IEventRegisterRequest, Event> {
  constructor(private readonly _eventRepository: EventRepository) { }

  async execute(companyInstance: CompanyInstance, data: IEventRegisterRequest): Promise<Event> {
    const event = new Event(companyInstance.addCompanyFilter(data));
    return this._eventRepository.register(companyInstance, event);
  };
}