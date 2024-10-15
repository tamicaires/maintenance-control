import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CreatePartBody } from "./dtos/createPartBody";
import { CreatePart } from "src/modules/part/useCases/createPart";
import { PartViewModel } from "./viewModel/partViewModel";
import { GetPart } from "src/modules/part/useCases/getPart";
import { ListParts } from "src/modules/part/useCases/listParts";
import { UpdatePart } from "src/modules/part/useCases/updatePart";
import { UpdatePartBody } from "./dtos/updatePartBody";

@Controller("parts")
export class PartController {
  constructor(
    private readonly createPart: CreatePart,
    private readonly getPart: GetPart,
    private readonly listParts: ListParts,
    private readonly updatePart: UpdatePart,
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

  @Get()
  async list() {
    const parts = await this.listParts.execute();
    return parts.map(PartViewModel.toHttp);
  }

  @Put(":id")
  async update(@Param("id") partId: string, @Body() part: UpdatePartBody) {
    const partUpdated = await this.updatePart.execute(partId, part);

    return PartViewModel.toHttp(partUpdated);
  }
}