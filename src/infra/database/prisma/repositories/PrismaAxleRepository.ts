import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaAxleMapper } from "../mappers/PrismaAxleMapper";
import { AxleRepository } from "src/core/domain/repositories/axle-repository";
import { Axle } from "src/core/domain/entities/axle";

@Injectable()
export class PrismaAxleRepository implements AxleRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(axle: Axle): Promise<void> {
    const axleRaw = PrismaAxleMapper.toPrisma(axle);

    await this.prisma.axle.create({
      data: axleRaw,
    });
  }

  async getById(axleId: string): Promise<Axle | null> {
    const axle = await this.prisma.axle.findUnique({
      where: {
        id: axleId,
      },
    });

    if (!axle) {
      return null;
    }

    return PrismaAxleMapper.toDomain(axle);
  }

  async list(): Promise<Axle[]> {
    const axles = await this.prisma.axle.findMany();

    return axles.map((axle) => PrismaAxleMapper.toDomain(axle));
  }
}