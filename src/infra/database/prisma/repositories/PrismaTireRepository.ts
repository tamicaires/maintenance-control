import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { TireRepository } from "src/modules/tire/repositories/TireRepository";
import { Tire } from "src/modules/tire/entities/Tire";
import { PrismaTireMapper } from "../mappers/PrismaTireMapper";

@Injectable()
export class PrismaTireRepository implements TireRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(tire: Tire): Promise<void> {
    const tireRaw = PrismaTireMapper.toPrisma(tire);

    await this.prisma.tire.create({
      data: tireRaw,
    });
  }

  async findBySerialNumber(fireNumber: string): Promise<Tire | null> {
    const tireRaw = await this.prisma.tire.findUnique({
      where: { fireNumber },
    });

    if (!tireRaw) {
      return null;
    }

    return PrismaTireMapper.toDomain(tireRaw);
  }

  async findById(tireId: string): Promise<Tire | null> {
    const tireRaw = await this.prisma.tire.findUnique({
      where: { id: tireId },
    });

    if (!tireRaw) {
      return null;
    }

    return PrismaTireMapper.toDomain(tireRaw);
  }

  async save(tire: Tire): Promise<void> {
    const tireRaw = PrismaTireMapper.toPrisma(tire);
    console.log("tireRaw", tireRaw);
    console.log("tire", tire);
    await this.prisma.tire.update({
      where: { id: tire.id },
      data: tireRaw,
    });
  }
}