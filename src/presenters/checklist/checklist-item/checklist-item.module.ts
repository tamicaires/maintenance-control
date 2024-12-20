import { Module } from "@nestjs/common";
import { ChecklistItemController } from "./checklist-item.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateChecklistItem } from "src/application/checklist/checklist-item/use-cases/create-checklist-item";

@Module({
  controllers: [ChecklistItemController],
  imports: [DatabaseModule],
  providers: [
    CreateChecklistItem,
  ]
})

export class ChecklistItemModule { }