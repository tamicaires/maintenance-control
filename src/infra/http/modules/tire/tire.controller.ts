import { Body, Controller, Post } from "@nestjs/common";
import { CreateTire } from "src/modules/tire/useCases/createTire";
import { CreateTireBody } from "./dtos/createTireBody";

@Controller("tires")
export class TireController {
  constructor(
    private readonly createTire: CreateTire) { }

  @Post()
  async create(@Body() body: CreateTireBody) {
    return await this.createTire.execute(body);
  }
}