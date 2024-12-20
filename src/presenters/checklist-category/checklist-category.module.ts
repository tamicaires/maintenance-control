import { Module } from "@nestjs/common";
import { ChecklistCategoryController } from "./checklist-category.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateChecklistCategory } from "src/application/checklist/checklist-category/use-cases/create-checklist-category";
import { GetChecklistCategoryById } from "src/application/checklist/checklist-category/use-cases/get-by-id";
import { ListChecklistCategories } from "src/application/checklist/checklist-category/use-cases/list-checklist-categories";

@Module({
  controllers: [ChecklistCategoryController],
  imports: [DatabaseModule],
  providers: [
    CreateChecklistCategory,
    GetChecklistCategoryById,
    ListChecklistCategories,
  ]
})

export class ChecklistCategoryModule { }