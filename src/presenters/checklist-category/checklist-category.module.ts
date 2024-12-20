import { Module } from "@nestjs/common";
import { ChecklistCategoryController } from "./checklist-category.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateChecklistCategory } from "src/application/checklist/checklist-category/use-cases/create-checklist-category";

@Module({
  controllers: [ChecklistCategoryController],
  imports: [DatabaseModule],
  providers: [
    CreateChecklistCategory
  ]
})

export class ChecklistCategoryModule { }