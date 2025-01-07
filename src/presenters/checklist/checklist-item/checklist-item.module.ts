import { Module } from "@nestjs/common";
import { ChecklistItemController } from "./checklist-item.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateChecklistItem } from "src/application/checklist/checklist-item/use-cases/create-checklist-item";
import { DeleteChecklistItem } from "src/application/checklist/checklist-item/use-cases/delete-checklist-item";
import { ListChecklistItemByChecklistId } from "src/application/checklist/checklist-item/use-cases/list-checklist-item";

@Module({
  controllers: [ChecklistItemController],
  imports: [DatabaseModule],
  providers: [
    CreateChecklistItem,
    ListChecklistItemByChecklistId,
    DeleteChecklistItem,
  ]
})

export class ChecklistItemModule { }