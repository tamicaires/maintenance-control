import { Trailer } from "src/core/domain/entities/trailer";

export class TrailerViewModel {
  static toHttp(trailer: Trailer){
    return {
      id: trailer.id,
      plate: trailer.plate,
      position: trailer.position,
      companyId: trailer.companyId,
      fleetId: trailer.fleetId,
      isActive: trailer.isActive,
      createdAt: trailer.createdAt,
      updatedAt: trailer.updatedAt,
    }
  }
}