import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { Event } from "src/core/domain/entities/event";
import { EventRepository } from "src/core/domain/repositories/event";
import { IUseCase } from "src/shared/protocols/use-case";

@Injectable()
export class GetEventsByWorkOrder implements IUseCase<string, Event[]> {
  constructor(private readonly _eventRepository: EventRepository) { }

  async execute(companyInstance: CompanyInstance, workOrderId: string): Promise<Event[]> {
    return await this._eventRepository.getByWorkOrder(
      companyInstance,
      workOrderId
    );
  }
}