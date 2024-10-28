import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { PartRequest } from "../entities/part-request";

export abstract class PartRequestRepository {
  abstract create(companyInstance: CompanyInstance, data: PartRequest): Promise<void>;
  abstract findById(companyInstance: CompanyInstance, id: string): Promise<PartRequest | null>;
  abstract list(companyInstance: CompanyInstance): Promise<PartRequest[]>;
}