import { CompanyInstance } from "src/core/company/company-instance";
import { Trailer } from "../entities/trailer";
import { ITrailerFilters } from "src/shared/types/filters.interface";
import { ITrailerWithCount, ITrailerWithRelationalData } from "src/shared/types/part-request/trailer.type";

export abstract class TrailerRepository {
  abstract create(trailer: Trailer): Promise<void>;
  abstract findByPlate(plate: string): Promise<ITrailerWithRelationalData | null>;
  abstract findById(companyInstance: CompanyInstance, trailerId: string): Promise<ITrailerWithRelationalData | null>;
  abstract save(trailer: Trailer): Promise<void>;
  abstract list(
    companyInstance: CompanyInstance,
    page: number,
    perPage: number,
    filters: ITrailerFilters,
  ): Promise<ITrailerWithCount>;
  abstract listByFleetId(companyInstance: CompanyInstance, fleetId: string): Promise<Trailer[]>;
}