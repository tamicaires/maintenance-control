import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { Event } from "src/core/domain/entities/event";
import { EventRepository } from "src/core/domain/repositories/event";
import { IEventFilters } from "src/shared/types/filters.interface";
import { PrismaService } from "../prisma.service";
import { EventMapper } from "../mappers/prisma-event-mapper";
import { Prisma } from "@prisma/client";

@Injectable()
export class PrismaEventRepository implements EventRepository {
  constructor(private readonly _prisma: PrismaService) { }

  async register(companyInstance: CompanyInstance, event: Event): Promise<Event> {
    await this._prisma.events.create({
      data: event
    });

    return event;
  }

  async getEvents(companyInstance: CompanyInstance, page: number, perPage: number, filters?: IEventFilters): Promise<Event[]> {
    const { event, subject, startDate, endDate } = filters || {};

    const where: Prisma.EventsWhereInput = {
      AND: {
        companyId: companyInstance.getCompanyId(),
        event: event ? { equals: event } : undefined,
        subject: subject ? { equals: subject } : undefined,
        handledAt: {
          gte: startDate ? new Date(startDate) : undefined,
          lte: endDate ? new Date(endDate) : undefined,
        }
      }
    }

    const events = await this._prisma.events.findMany({
      where: where,
      include: {
        workOrder: {
          select: {
            id: true,
            displayId: true
          }
        },
        handledBy: {
          select: {
            id: true,
            name: true,
          }
        },
        checklist: {
          select: {
            id: true,
            template: {
              select: {
                id: true,
                name: true,
                icon: true
              }
            }
          }
        }
      },
      take: perPage,
      skip: (page - 1) * perPage
    });

    return events.map(EventMapper.toDomain);
  }

  async findById(companyInstance: CompanyInstance, eventId: string): Promise<Event | null> {
    const event = await this._prisma.events.findFirst({
      where: {
        id: eventId,
        companyId: companyInstance.getCompanyId()
      }
    });

    if (!event) {
      return null;
    }

    return EventMapper.toDomain(event);
  }

  async delete(companyInstance: CompanyInstance, eventId: string): Promise<void> {
    await this._prisma.events.delete({
      where: {
        id: eventId,
        companyId: companyInstance.getCompanyId()
      }
    });
  }

  async getByWorkOrder(companyInstance: CompanyInstance, workOrderId: string): Promise<Event[]> {
    const events = await this._prisma.events.findMany({
      where: {
        workOrder: {
          id: workOrderId,
          companyId: companyInstance.getCompanyId()
        }
      },
      include: {
        workOrder: {
          select: {
            id: true,
            displayId: true
          }
        },
        handledBy: {
          select: {
            id: true,
            name: true,
          }
        },
        checklist: {
          select: {
            id: true,
            template: {
              select: {
                id: true,
                name: true,
                icon: true
              }
            }
          }
        }
      },
      orderBy: {
        handledAt: 'desc'
      }
    })

    return events.map(EventMapper.toDomain)
  }

}