import { Module } from "@nestjs/common";
import { ChecklistTemplateItemController } from "./checklist-template-item.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateChecklistTemplateItem } from "src/application/checklist/checklist-item-template/use-cases/create-checklist-item-template";
import { ListChecklistTemplateItem } from "src/application/checklist/checklist-item-template/use-cases/list-checklist-item-template";
import { GetChecklistTemplateItemsByTemplateId } from "src/application/checklist/checklist-item-template/use-cases/get-checklist-item-by-id";

@Module({
  controllers: [ChecklistTemplateItemController],
  imports: [DatabaseModule],
  providers: [
    CreateChecklistTemplateItem,
    ListChecklistTemplateItem,
    GetChecklistTemplateItemsByTemplateId,
  ]
})

export class ChecklistTemplateItemModule { }