import { Module } from "@nestjs/common";
import { EventController } from "./event.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { ListEvents } from "src/application/event/use-cases/list-events";
import { DeleteEvent } from "src/application/event/use-cases/delete-event";
import { GetEventsByWorkOrder } from "src/application/event/use-cases/get-work-order-events";

@Module({
  controllers: [EventController],
  imports: [DatabaseModule],
  providers: [
    ListEvents,
    DeleteEvent,
    GetEventsByWorkOrder
  ]
})

export class EventModule { }