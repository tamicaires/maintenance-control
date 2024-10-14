import { Trailer } from "src/modules/trailer/entities/Trailer";
import { Trailer as TrailerRaw } from "@prisma/client";

export class PrismaTrailerMapper {
  static toPrisma(trailer: Trailer): TrailerRaw {
    return {
      id: trailer.id,
      plate: trailer.plate,
      position: trailer.position,
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
      fleetId: trailer.fleetId,
      isActive: trailer.isActive,
    }, trailer.id
    );
  }
}