import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CompanyInstance } from "src/core/company/company-instance";
import { TrailerRepository } from "src/core/domain/repositories/trailer-repository";
import { Trailer } from "src/core/domain/entities/trailer";
import { ITrailerFilters } from "src/shared/types/filters.interface";
import { Prisma } from "@prisma/client";
import { ITrailerWithCount, ITrailerWithRelationalData } from "src/shared/types/part-request/trailer.type";

@Injectable()
export class PrismaTrailerRepository implements TrailerRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(trailer: Trailer): Promise<void> {
    await this.prisma.trailer.create({
      data: trailer,
    });
  }

  async findByPlate(plate: string): Promise<ITrailerWithRelationalData | null> {
    const trailer = await this.prisma.trailer.findUnique({
      where: { plate },
      include: {
        fleet: {
          select: {
            id: true,
            fleetNumber: true
          }
        },
        axles: {
          select: {
            id: true,
            position: true
          }
        }
      }
    });

    if (!trailer) {
      return null;
    }

    return trailer;
  }

  async findById(companyInstance: CompanyInstance, trailerId: string): Promise<ITrailerWithRelationalData | null> {
    const trailer = await this.prisma.trailer.findUnique({
      where: { id: trailerId },
      include: {
        fleet: {
          select: {
            id: true,
            fleetNumber: true
          }
        },
        axles: {
          select: {
            id: true,
            position: true
          }
        }
      }
    })

    if (!trailer) {
      return null;
    }

    return trailer;
  }

  save(trailer: Trailer): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async list(
    companyInstance: CompanyInstance,
    page: number,
    perPage: number,
    filters: ITrailerFilters,
  ): Promise<ITrailerWithCount> {
    const {
      fleetNumber,
      isActive,
      startDate,
      endDate
    } = filters;

    const where: Prisma.TrailerWhereInput = {
      companyId: companyInstance.getCompanyId(),
      AND: [
        fleetNumber ? { fleet: { fleetNumber } } : undefined,
        isActive ? { isActive } : undefined,
        startDate && endDate
          ? {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          }
          : undefined,
      ].filter(Boolean) as Prisma.TrailerWhereInput[],
    };

    const totalCount = await this.prisma.trailer.count({ where });

    const trailers = await this.prisma.trailer.findMany({
      where,
      include: {
        fleet: {
          select: {
            id: true,
            fleetNumber: true
          }
        }
      },
      take: perPage,
      skip: (page - 1) * perPage,
    });

    console.log('trailers', trailers);
    return { trailers, totalCount };
  }

  async listByFleetId(companyInstance: CompanyInstance, fleetId: string): Promise<Trailer[]> {
    const trailers = await this.prisma.trailer.findMany({
      where: {
        companyId: companyInstance.getCompanyId(),
        fleetId
      }
    });

    return trailers;
  }

}