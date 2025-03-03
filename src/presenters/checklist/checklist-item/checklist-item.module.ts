import { Module } from "@nestjs/common";
import { ChecklistItemController } from "./checklist-item.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateChecklistItem } from "src/application/checklist/checklist-item/use-cases/create-checklist-item";
import { DeleteChecklistItem } from "src/application/checklist/checklist-item/use-cases/delete-checklist-item";
import { ListChecklistItemByChecklistId } from "src/application/checklist/checklist-item/use-cases/list-checklist-item";
import { CreateChecklistItemsBatch } from "src/application/checklist/checklist-item/use-cases/create-checklist-item-batch";
import { GetChecklistTemplateItemsByTemplateId } from "src/application/checklist/checklist-item-template/use-cases/get-checklist-item-by-template-id";
import { GetTrailersByWorkOrder } from "src/application/trailer/useCases/get-trailers-by-work-order";
import { ChangeChecklistItemConformity } from "src/application/checklist/checklist-item/use-cases/change-item-conformity";

@Module({
  controllers: [ChecklistItemController],
  imports: [DatabaseModule],
  providers: [
    CreateChecklistItem,
    ListChecklistItemByChecklistId,
    DeleteChecklistItem,
    CreateChecklistItemsBatch,
    GetChecklistTemplateItemsByTemplateId,
    GetTrailersByWorkOrder,
    ChangeChecklistItemConformity
  ]
})

export class ChecklistItemModule { }