import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreatePartBody } from "./dtos/createPartBody";
import { CreatePart } from "src/modules/part/useCases/createPart";
import { PartViewModel } from "./viewModel/partViewModel";
import { GetPart } from "src/modules/part/useCases/getPart";

@Controller("parts")
export class PartController {
  constructor(
    private readonly createPart: CreatePart,
    private readonly getPart: GetPart
  ) { }

  @Post()
  async create(@Body() part: CreatePartBody) {
    const partCreated = await this.createPart.execute(part);
    return PartViewModel.toHttp(partCreated);
  }

  @Get(":id")
  async get(@Param("id") partId: string) {
    const part = await this.getPart.execute(partId);
    return PartViewModel.toHttp(part);
  }
}