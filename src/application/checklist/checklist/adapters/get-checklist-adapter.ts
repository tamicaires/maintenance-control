import { IChecklistRelationalDataPrismaResponse, IChecklistTransformedResponse } from "src/shared/types/checklist";

export class GetChecklistAdapter {
  static transformResponse(checklist: IChecklistRelationalDataPrismaResponse): IChecklistTransformedResponse {
    return {
      ...checklist,
      template: {
        id: checklist.template.id,
        name: checklist.template.name,
        icon: checklist.template.icon,
        templateCategories: checklist.template.checklistCategories.map((category) => ({
          id: category.id,
          name: category.name,
          description: category.description,
          templateItems: category.ChecklistItemTemplate,
        })),
      },
    };
  }
}
