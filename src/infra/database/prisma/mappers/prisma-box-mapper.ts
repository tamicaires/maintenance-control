import { Box } from "src/core/domain/entities/box";
import { Box as BoxRaw } from "@prisma/client";

export class PrismaBoxMapper {
  static toDomain(box: BoxRaw): Box {
    return new Box({
      name: box.name,
      description: box.description,
      isActive: box.isActive,
      companyId: box.companyId,
      position: box.position,
    }, box.id);
  }

  static toPrisma(box: Box): BoxRaw {
    return {
      id: box.id,
      name: box.name,
      description: box.description,
      isActive: box.isActive,
      companyId: box.companyId,
      position: box.position,
    };
  }
}