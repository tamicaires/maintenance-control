import { Body, Controller, Post } from "@nestjs/common";
import { CreateAxle } from "src/modules/axle/useCases/createAxle";
import { CreateAxleBody } from "./dtos/createAxleBody";

@Controller("axles")
export class AxleController {
  constructor(
    private readonly createAxle: CreateAxle
  ) { }

  @Post()
  async create(@Body() axle: CreateAxleBody) {
    return this.createAxle.execute(axle);
  }
}