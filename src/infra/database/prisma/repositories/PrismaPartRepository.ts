import { Injectable } from "@nestjs/common";
import { Part } from "src/modules/part/entities/Part";
import { PartRepository } from "src/modules/part/repositories/partRepository";
import { PrismaService } from "../prisma.service";
import { PrismaPartMapper } from "../mappers/PrismaPartMapper";

@Injectable()
export class PrismaPartRepository implements PartRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(part: Part): Promise<void> {
    const partRaw = PrismaPartMapper.toPrisma(part);

    await this.prisma.part.create({
      data: partRaw,
    });

  }

  async findByPartnumber(partNumber: string): Promise<Part | null> {
    const partRaw = await this.prisma.part.findUnique({
      where: { partNumber },
    });

    if (!partRaw) {
      return null;
    }

    return PrismaPartMapper.toDomain(partRaw);
  }

  async findById(id: string): Promise<Part | null> {
    const partRaw = await this.prisma.part.findUnique({
      where: { id },
    });

    if (!partRaw) {
      return null;
    }

    return PrismaPartMapper.toDomain(partRaw);
  }

  async list(): Promise<Part[]> {
    const parts = await this.prisma.part.findMany();

    return parts.map((part) => PrismaPartMapper.toDomain(part));
  }
}