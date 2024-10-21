import { Fleet } from "src/domain/fleet/entities/Fleet";
import { Trailer } from "src/domain/trailer/entities/Trailer";

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