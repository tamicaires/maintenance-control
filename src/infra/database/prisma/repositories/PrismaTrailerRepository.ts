import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaTrailerMapper } from "../mappers/PrimaTrailerMapper";
import { TrailerRepository } from "src/domain/trailer/repositories/trailerRepository";
import { Trailer } from "src/domain/trailer/entities/Trailer";
import { CompanyInstance } from "src/core/company/company-instance";

@Injectable()
export class PrismaTrailerRepository implements TrailerRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(trailer: Trailer): Promise<void> {
    const trailerRaw = PrismaTrailerMapper.toPrisma(trailer);
    console.log('trailerraw', trailerRaw);

    console.log("trailer", trailer);
    await this.prisma.trailer.create({
      data: trailerRaw,
    });
  }

  async findByPlate(plate: string): Promise<Trailer | null> {
    const trailer = await this.prisma.trailer.findUnique({
      where: { plate }
    });

    if (!trailer) {
      return null;
    }

    return PrismaTrailerMapper.toDomain(trailer);
  }

  async findById(trailerId: string): Promise<Trailer | null> {
    const trailer = await this.prisma.trailer.findUnique({
      where: { id: trailerId }
    });

    if (!trailer) {
      return null;
    }

    return PrismaTrailerMapper.toDomain(trailer);
  }

  save(trailer: Trailer): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async list(companyInstance: CompanyInstance): Promise<Trailer[]> {
    const trailers = await this.prisma.trailer.findMany({
      where: {
        companyId: companyInstance.getCompanyId()
      }
    });

    return trailers.map(PrismaTrailerMapper.toDomain);
  }
}