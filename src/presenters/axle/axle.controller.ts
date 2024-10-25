import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateAxleBody } from "./dtos/createAxleBody";
import { CreateAxle } from "src/application/axle/useCases/createAxle";
import { GetAxle } from "src/application/axle/useCases/getAxle";
import { ListAxles } from "src/application/axle/useCases/listAxles";

@Controller("axles")
export class AxleController {
  constructor(
    private readonly createAxle: CreateAxle,
    private readonly getAxleById: GetAxle,
    private readonly listAxles: ListAxles,
  ) { }

  @Post()
  async create(@Body() axle: CreateAxleBody) {
    return await this.createAxle.execute(axle);
  }

  @Get(":id")
  async getById(@Param("id") axleId: string) {
    return await this.getAxleById.execute(axleId);
  }

  @Get()
  async list() {
    return await this.listAxles.execute();
  }
}