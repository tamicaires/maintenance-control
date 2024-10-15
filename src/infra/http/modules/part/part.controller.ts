import { Body, Controller, Post } from "@nestjs/common";
import { CreatePartBody } from "./dtos/createPartBody";
import { CreatePart } from "src/modules/part/useCases/createPart";
import { PartViewModel } from "./viewModel/partViewModel";

@Controller("parts")
export class PartController {
  constructor(private readonly createPart: CreatePart) { }

  @Post()
  async create(@Body() part: CreatePartBody) {
    const partCreated = await this.createPart.execute(part);
    return PartViewModel.toHttp(partCreated);
  }
}