import { Module } from "@nestjs/common";
import { ChecklistTemplateItemController } from "./checklist-template-item.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateChecklistTemplateItem } from "src/application/checklist/checklist-item-template/use-cases/create-checklist-item-template";

@Module({
  controllers: [ChecklistTemplateItemController],
  imports: [DatabaseModule],
  providers: [
    CreateChecklistTemplateItem,
  ]
})

export class ChecklistTemplateItemModule { }