import { Axle as AxleRaw } from "@prisma/client";
import { Axle } from "src/domain/axle/entities/axle";

export class PrismaAxleMapper {
  static toPrisma(trailer: Axle): AxleRaw {
    return {
      id: trailer.id,
      capacity: trailer.capacity,
      position: trailer.position,
      type: trailer.type,
      trailerId: trailer.trailerId,
      createdAt: trailer.createdAt,
      updatedAt: trailer.updatedAt,
    };
  }

  static toDomain(trailer: AxleRaw): Axle {
    return new Axle({
      capacity: trailer.capacity,
      position: trailer.position,
      type: trailer.type,
      trailerId: trailer.trailerId,
      createdAt: trailer.createdAt,
      updatedAt: trailer.updatedAt,
    }, trailer.id
    );
  }
}