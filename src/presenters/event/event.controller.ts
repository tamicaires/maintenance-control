import { Controller, Delete, Get, Param, Query } from "@nestjs/common";
import { DeleteEvent } from "src/application/event/use-cases/delete-event";
import { GetEventsByWorkOrder } from "src/application/event/use-cases/get-work-order-events";
import { ListEvents } from "src/application/event/use-cases/list-events";
import { CompanyInstance } from "src/core/company/company-instance";
import { CookiesEnum } from "src/core/enum/cookies";
import { EventActionEnum } from "src/core/enum/event";
import { SubjectEnum } from "src/core/enum/subject.enum";
import { Cookies } from "src/infra/http/auth/decorators/cookies.decorator";

@Controller('event')
export class EventController {
  constructor(
    private readonly _listEvents: ListEvents,
    private readonly _deleteEvent: DeleteEvent,
    private readonly _getEventsByWorkOrder: GetEventsByWorkOrder,
  ) { }

  @Get()
  async listEvents(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('event') event?: EventActionEnum,
    @Query('subject') subject?: SubjectEnum,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('checklistId') checklistId?: string,
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    const queries = {
      page,
      perPage,
      event,
      subject,
      startDate,
      endDate,
      checklistId
    }

    return this._listEvents.execute(companyInstance, queries);
  }

  @Delete(':eventId')
  async deleteEvent(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Param('eventId') eventId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    return this._deleteEvent.execute(companyInstance, eventId);
  }

  @Get('work-order/:id')
  async getByWorkOrder(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Param('id') workOrderId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    return this._getEventsByWorkOrder.execute(companyInstance, workOrderId);
  }
}