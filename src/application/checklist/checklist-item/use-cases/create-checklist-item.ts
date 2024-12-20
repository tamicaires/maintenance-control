// import { Injectable } from "@nestjs/common";
// import { CompanyInstance } from "src/core/company/company-instance";
// import { ChecklistItem } from "src/core/domain/entities/checklist/checklist-item";

// interface IRequest {
//   name: string;
//   checklistId: string;
//   itemTemplateId: string;
//   checklistCategoryId: string;
//   isConform: boolean;
// }

// @Injectable()
// export class CreateChecklistItem {
//   constructor() { }

//   async execute(companyInstance: CompanyInstance, item: IRequest): Promise<ChecklistItem> { 
//     const checklistItem = new ChecklistItem({
//       name: item.name,
//       checklistId: item.checklistId,

//     })
//   }
// }