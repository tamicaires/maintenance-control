import { Injectable } from "@nestjs/common";
import { Trailer } from "src/modules/trailer/entities/Trailer";
import { TrailerRepository } from "src/modules/trailer/repositories/trailerRepository";
import { PrismaService } from "../prisma.service";
import { PrismaTrailerMapper } from "../mappers/PrimaTrailerMapper";

@Injectable()
export class PrismaTrailerRepository implements TrailerRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(trailer: Trailer): Promise<void> {
    const trailerRaw = PrismaTrailerMapper.toPrisma(trailer);

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
  save(trailer: Trailer): Promise<void> {
    throw new Error("Method not implemented.");
  }
}