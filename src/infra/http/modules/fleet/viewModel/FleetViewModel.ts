import { Fleet } from "src/modules/fleet/entities/Fleet";

export class FleetViewModel{
  static toHttp({ 
    id,
    fleetNumber,
    plate,
    firstTrailerPlate,
    secondTrailerPlate,
    thirdTrailerPlate,
    carrierId,
    km,
    status,
    createdAt,
    updatedAt
  }: Fleet){
    return {
    id,
    fleetNumber,
    plate,
    firstTrailerPlate,
    secondTrailerPlate,
    thirdTrailerPlate,
    carrierId,
    km,
    status,
    createdAt,
    updatedAt
    };
  };
};