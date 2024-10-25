import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CreatePartBody } from "./dtos/createPartBody";
import { PartViewModel } from "./viewModel/partViewModel";
import { UpdatePartBody } from "./dtos/updatePartBody";
import { Cookies } from "src/infra/http/auth/decorators/cookies.decorator";
import { CookiesEnum } from "src/core/enum/cookies";
import { CreatePart } from "src/application/part/useCases/createPart";
import { GetPart } from "src/application/part/useCases/getPart";
import { ListParts } from "src/application/part/useCases/listParts";
import { UpdatePart } from "src/application/part/useCases/updatePart";

@Controller("parts")
export class PartController {
  constructor(
    private readonly createPart: CreatePart,
    private readonly getPart: GetPart,
    private readonly listParts: ListParts,
    private readonly updatePart: UpdatePart,
  ) { }

  @Post()
  async create(
    @Body() part: CreatePartBody,
    @Cookies(CookiesEnum.CompanyId) companyId: string
  ) {
    const partCreated = await this.createPart.execute({
      ...part,
      companyId
    });
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