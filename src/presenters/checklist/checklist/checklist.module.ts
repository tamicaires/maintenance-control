import { Module } from "@nestjs/common";
import { ChecklistController } from "./checklist.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateChecklist } from "src/application/checklist/checklist/use-cases/create-checklist";
import { ListChecklists } from "src/application/checklist/checklist/use-cases/list-checklists";

@Module({
  controllers: [ChecklistController],
  imports: [DatabaseModule],
  providers: [
    CreateChecklist,
    ListChecklists,
  ]
})

export class ChecklistModule { }