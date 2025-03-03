import { CompanyInstance } from "src/core/company/company-instance";
import { Trailer } from "../entities/trailer";
import { ITrailerWithRelationalData } from "src/shared/types/trailer-with-relational-data";

export abstract class TrailerRepository {
  abstract create(trailer: Trailer): Promise<void>;
  abstract findByPlate(plate: string): Promise<ITrailerWithRelationalData | null>;
  abstract findById(companyInstance: CompanyInstance, trailerId: string): Promise<ITrailerWithRelationalData | null>;
  abstract save(trailer: Trailer): Promise<void>;
  abstract list(companyInstance: CompanyInstance): Promise<ITrailerWithRelationalData[]>;
  abstract listByFleetId(companyInstance: CompanyInstance, fleetId: string): Promise<Trailer[]>;
}