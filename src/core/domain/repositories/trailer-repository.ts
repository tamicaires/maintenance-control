import { CompanyInstance } from "src/core/company/company-instance";
import { Trailer } from "../entities/trailer";

export abstract class TrailerRepository {
  abstract create(trailer: Trailer): Promise<void>;
  abstract findByPlate(plate: string): Promise<Trailer | null>;
  abstract findById(trailerId: string): Promise<Trailer | null>;
  abstract save(trailer: Trailer): Promise<void>;
  abstract list(companyInstance: CompanyInstance): Promise<Trailer[]>;
}