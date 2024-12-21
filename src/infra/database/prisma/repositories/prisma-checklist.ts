import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ChecklistRepository } from "src/core/domain/repositories/checklist/checklist-repository";
import { CompanyInstance } from "src/core/company/company-instance";
import { Checklist } from "src/core/domain/entities/checklist/checklist";

@Injectable()
export class PrismaChecklistRepository implements ChecklistRepository {
  constructor(private readonly _prisma: PrismaService) { }

  async create(companyInstance: CompanyInstance, item: Checklist): Promise<Checklist> {
    const checklist = await this._prisma.checklist.create({
      data: item,
    })

    return checklist;
  }

  async findById(companyInstance: CompanyInstance, id: string): Promise<Checklist | null> {
    const companyId = companyInstance.getCompanyId();

    const checklist = await this._prisma.checklist.findUnique({
      where: {
        id,
        workOrder: {
          companyId
        }
      }
    })

    return checklist;
  }

  async list(companyInstance: CompanyInstance): Promise<Checklist[]> {
    const companyId = companyInstance.getCompanyId();

    const checklists = await this._prisma.checklist.findMany({
      where: {
        workOrder: {
          companyId
        }
      }
    })

    return checklists;
  }
}