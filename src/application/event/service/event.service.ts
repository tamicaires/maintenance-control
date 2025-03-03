import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { Event } from "src/core/domain/entities/event";
import { IEventRegisterRequest, RegisterEvent } from "../use-cases/register-event";

@Injectable()
export class EventService {
  constructor(
    private readonly _registerEventUseCase: RegisterEvent,
  ) { }

  async registerEvent(companyInstance: CompanyInstance, data: IEventRegisterRequest): Promise<Event> {
    return this._registerEventUseCase.execute(companyInstance, data);
  }
}