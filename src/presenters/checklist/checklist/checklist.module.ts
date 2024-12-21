import { Module } from "@nestjs/common";
import { ChecklistController } from "./checklist.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateChecklist } from "src/application/checklist/checklist/use-cases/create-checklist";

@Module({
  controllers: [ChecklistController],
  imports: [DatabaseModule],
  providers: [
    CreateChecklist,
  ]
})

export class ChecklistModule { }