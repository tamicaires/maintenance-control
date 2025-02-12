import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CompanyInstance } from "src/core/company/company-instance";
import { TrailerRepository } from "src/core/domain/repositories/trailer-repository";
import { Trailer } from "src/core/domain/entities/trailer";
import { ITrailerWithRelationalData } from "src/shared/types/trailer-with-relational-data";

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

  async list(companyInstance: CompanyInstance): Promise<ITrailerWithRelationalData[]> {
    const trailers = await this.prisma.trailer.findMany({
      where: {
        companyId: companyInstance.getCompanyId(),
      },
      include: {
        fleet: {
          select: {
            id: true,
            fleetNumber: true
          }
        }
      }
    });

    return trailers;
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