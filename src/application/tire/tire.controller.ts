import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { TireViewModel } from "./viewModel/tireViewModel";
import { CreateTireBody } from "./dtos/createTireBody";
import { UpdateTireBody } from "./dtos/updateTireBody";
import { CreateTire } from "src/domain/tire/useCases/createTire";
import { GetTire } from "src/domain/tire/useCases/getTire";
import { UpdateTire } from "src/domain/tire/useCases/updateTire";


@Controller("tires")
export class TireController {
  constructor(
    private readonly createTire: CreateTire,
    private readonly getTire: GetTire,
    private readonly updateTire: UpdateTire,
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

  @Put(":tireId")
  async update(@Param("tireId") tireId: string, @Body() body: UpdateTireBody) {
    const tire = await this.updateTire.execute(tireId, body);
    return TireViewModel.toHttp(tire);
  }
} 