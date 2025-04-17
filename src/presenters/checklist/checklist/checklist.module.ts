import { Module } from "@nestjs/common";
import { ChecklistController } from "./checklist.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateChecklist } from "src/application/checklist/checklist/use-cases/create-checklist";
import { ListChecklists } from "src/application/checklist/checklist/use-cases/list-checklists";
import { GetTrailersByWorkOrder } from "src/application/trailer/useCases/get-trailers-by-work-order";
import { GetChecklistById } from "src/application/checklist/checklist/use-cases/get-checklist";
import { EventService } from "src/application/event/service/event.service";
import { RegisterEvent } from "src/application/event/use-cases/register-event";
import { DeleteChecklist } from "src/application/checklist/checklist/use-cases/delete-checklist";
import { GetChecklistByWorkOrder } from "src/application/checklist/checklist/use-cases/get-checklist-by-work-order";
import { CreateChecklistItemsBatch } from "src/application/checklist/checklist-item/use-cases/create-checklist-item-batch";
import { GetChecklistTemplateItemsByTemplateId } from "src/application/checklist/checklist-item-template/use-cases/get-checklist-item-by-template-id";

@Module({
  controllers: [ChecklistController],
  imports: [DatabaseModule],
  providers: [
    CreateChecklist,
    ListChecklists,
    GetTrailersByWorkOrder,
    GetChecklistById,
    GetChecklistByWorkOrder,
    EventService,
    RegisterEvent,
    DeleteChecklist,
    CreateChecklistItemsBatch,
    GetChecklistTemplateItemsByTemplateId,
  ]
})

export class ChecklistModule { }