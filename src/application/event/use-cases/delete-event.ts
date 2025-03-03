import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { EventRepository } from "src/core/domain/repositories/event";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";
import { IUseCase } from "src/shared/protocols/use-case";

@Injectable()
export class DeleteEvent implements IUseCase<string, void> {
  constructor(private readonly _eventRepository: EventRepository) { }

  async execute(companyInstance: CompanyInstance, eventId: string): Promise<void> {
    const eventExists = await this._eventRepository.findById(companyInstance, eventId);
    if (!eventExists) {
      throw new ExceptionHandler({
        message: "Evento não encontrado",
        status: HttpStatus.NOT_FOUND
      })
    }

    await this._eventRepository.delete(companyInstance, eventId);
  }
}