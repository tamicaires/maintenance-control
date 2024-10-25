import { Trailer as TrailerRaw } from "@prisma/client";
import { Trailer } from "src/core/domain/entities/trailer";

export class PrismaTrailerMapper {
  static toPrisma(trailer: Trailer): TrailerRaw {
    return {
      id: trailer.id,
      plate: trailer.plate,
      position: trailer.position,
      companyId: trailer.companyId,
      fleetId: trailer.fleetId,
      isActive: trailer.isActive,
      createdAt: trailer.createdAt,
      updatedAt: trailer.updatedAt,
    };
  }

  static toDomain(trailer: TrailerRaw): Trailer {
    return new Trailer({
      plate: trailer.plate,
      position: trailer.position,
      companyId: trailer.companyId,
      fleetId: trailer.fleetId,
      isActive: trailer.isActive,
      createdAt: trailer.createdAt,
      updatedAt: trailer.updatedAt,
    }, trailer.id
    );
  }
}