import { Module } from "@nestjs/common";
import { ChecklistTemplateController } from "./checklist-template.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateChecklistTemplate } from "src/application/checklist/checklist-template/use-cases/create-checklist-template";

@Module({
  controllers: [ChecklistTemplateController],
  imports: [DatabaseModule],
  providers: [
    CreateChecklistTemplate,
  ]
})

export class ChecklistTemplateModule { }