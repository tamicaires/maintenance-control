import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateAxle } from "src/modules/axle/useCases/createAxle";
import { CreateAxleBody } from "./dtos/createAxleBody";
import { GetAxle } from "src/modules/axle/useCases/getAxle";

@Controller("axles")
export class AxleController {
  constructor(
    private readonly createAxle: CreateAxle,
    private readonly getAxleById: GetAxle
  ) { }

  @Post()
  async create(@Body() axle: CreateAxleBody) {
    return this.createAxle.execute(axle);
  }

  @Get(":id")
  async getById(@Param("id") axleId: string) {
    return this.getAxleById.execute(axleId);
  }

}