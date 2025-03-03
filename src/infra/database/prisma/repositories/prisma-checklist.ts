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
      },
      include: {
        template: {
          select: {
            id: true,
            name: true,
            icon: true
          }
        },
        workOrder: {
          select: {
            id: true,
            displayId: true,
          }
        }
        ,
        items: true
      }
    })

    return checklists;
  }

  async findByIdWithRelationalData(companyInstance: CompanyInstance, checklistId: string) {
    return await this._prisma.checklist.findUnique({
      where: {
        id: checklistId,
        template: {
          companyId: companyInstance.getCompanyId()
        }
      },
      include: {
        template: {
          select: {
            id: true,
            name: true,
            icon: true,
            checklistCategories: {
              select: {
                id: true,
                name: true,
                description: true,
                ChecklistItemTemplate: {
                  select: {
                    id: true,
                    description: true,
                    weight: true
                  }
                }
              }
            }
          }
        },
        workOrder: {
          select: {
            id: true,
            displayId: true,
            typeOfMaintenance: true,
            fleet: {
              select: {
                id: true,
                fleetNumber: true,
                trailers: {
                  select: {
                    id: true,
                    plate: true,
                    position: true,
                    axles: {
                      select: {
                        id: true,
                        position: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })
  }

  async delete(companyInstance: CompanyInstance, checklist: Checklist): Promise<void> {
    await this._prisma.checklist.delete({
      where: {
        id: checklist.id,
        workOrder: {
          companyId: companyInstance.getCompanyId()
        }
      }
    })
  }

  async deleteMany(companyInstance: CompanyInstance, checklistIds: string[]): Promise<void> {
    await this._prisma.checklist.deleteMany({
      where: {
        id: {
          in: checklistIds
        },
        workOrder: {
          companyId: companyInstance.getCompanyId()
        }
      },
    })
  }

  async findChecklistByWorkOrder(companyInstance: CompanyInstance, workOrderId: string): Promise<Checklist | null> {
    const companyId = companyInstance.getCompanyId();

    const checklist = await this._prisma.checklist.findFirst({
      where: {
        workOrderId,
        workOrder: {
          companyId
        }
      },
      include: {
        template: {
          select: {
            id: true,
            name: true,
            icon: true,
            checklistCategories: {
              select: {
                id: true,
                name: true,
                description: true,
                ChecklistItemTemplate: {
                  select: {
                    id: true,
                    description: true,
                    weight: true
                  }
                }
              }
            }
          }
        },
        workOrder: {
          select: {
            id: true,
            displayId: true,
            typeOfMaintenance: true,
            fleet: {
              select: {
                id: true,
                fleetNumber: true,
                trailers: {
                  select: {
                    id: true,
                    plate: true,
                    position: true,
                    axles: {
                      select: {
                        id: true,
                        position: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })

    return checklist;
  }
}