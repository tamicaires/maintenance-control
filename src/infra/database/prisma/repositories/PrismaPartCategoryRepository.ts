import { PrismaService } from "../prisma.service";
import { PrismaPartCategoryMapper } from "../mappers/PrismaPartCatergoryMapper";
import { Injectable } from "@nestjs/common";
import { PartCategoryRepository } from "src/core/domain/repositories/part-category-repository";
import { PartCategory } from "src/core/domain/entities/part-category";

@Injectable()
export class PrismaPartCategoryRepository implements PartCategoryRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(partCategory: PartCategory): Promise<void> {
    const partCategoryRaw = PrismaPartCategoryMapper.toPrisma(partCategory);

    await this.prisma.partCategory.create({
      data: partCategoryRaw,
    });
  }

  async findByName(name: string): Promise<PartCategory | null> {
    const partCategoryRaw = await this.prisma.partCategory.findUnique({
      where: {
        name,
      },
    });

    if (!partCategoryRaw) {
      return null;
    }

    return PrismaPartCategoryMapper.toDomain(partCategoryRaw);
  }

  async findById(id: string): Promise<PartCategory | null> {
    const partCategoryRaw = await this.prisma.partCategory.findUnique({
      where: {
        id,
      },
    });

    if (!partCategoryRaw) {
      return null;
    }

    return PrismaPartCategoryMapper.toDomain(partCategoryRaw);
  }

  async list(): Promise<PartCategory[]> {
    const partCategoriesRaw = await this.prisma.partCategory.findMany();

    return partCategoriesRaw.map(PrismaPartCategoryMapper.toDomain);
  }
}