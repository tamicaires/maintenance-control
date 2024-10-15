import { Injectable } from "@nestjs/common";
import { Axle } from "src/modules/axle/entities/axle";
import { AxleRepository } from "src/modules/axle/repositories/axleRepository";
import { PrismaService } from "../prisma.service";
import { PrismaAxleMapper } from "../mappers/PrismaAxleMapper";

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
}