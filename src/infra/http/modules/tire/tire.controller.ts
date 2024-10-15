import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateTire } from "src/modules/tire/useCases/createTire";
import { CreateTireBody } from "./dtos/createTireBody";
import { GetTire } from "src/modules/tire/useCases/getTire";
import { TireViewModel } from "./viewModel/tireViewModel";

@Controller("tires")
export class TireController {
  constructor(
    private readonly createTire: CreateTire,
    private readonly getTire: GetTire,
  ) { }

  @Post()
  async create(@Body() body: CreateTireBody) {
    return await this.createTire.execute(body);
  }

  @Get(":tireId")
  async get(@Param("tireId") tireId: string) {
    const tire = await this.getTire.execute(tireId);
    return TireViewModel.toHttp(tire);
  }
}