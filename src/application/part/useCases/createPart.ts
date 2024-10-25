import { Injectable } from "@nestjs/common";
import { PartRepository } from "../../../core/domain/repositories/part-repository";
import { PartAlreadyExistsException } from "../exceptions/PartAlreadyExistsException";
import { Part } from "../../../core/domain/entities/part";
import { TPartLocation, TPartStatus } from "../../../core/enum/part.enum";

interface ICreatePartRequest {
  name: string;
  description: string | null;
  partNumber: string;
  serialNumber: string;
  model: string | null;
  brand: string | null;
  supplier: string | null;
  costPrice: number;
  sellingPrice: number | null;
  stockQuantity: number;
  location: TPartLocation;
  status: TPartStatus;
  categoryId: string;
  companyId: string;
  trailerId: string | null;
  axleId: string | null;
}

@Injectable()
export class CreatePart {
  constructor(private readonly partRepository: PartRepository) { }

  async execute(part: ICreatePartRequest) {
    const partAlreadyExists = await this.partRepository.findByPartnumber(
      part.partNumber
    );
    if (partAlreadyExists) {
      throw new PartAlreadyExistsException();
    }

    const newPart = new Part(part);
    await this.partRepository.create(newPart);
    return newPart;
  }
}