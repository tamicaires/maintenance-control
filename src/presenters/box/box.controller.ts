import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateBox } from "src/application/box/useCases/create-box";
import { CreateBoxBody } from "./dto/create-box-body";
import { Cookies } from "src/infra/http/auth/decorators/cookies.decorator";
import { CookiesEnum } from "src/core/enum/cookies";
import { CompanyInstance } from "src/core/company/company-instance";
import { BoxViewModel } from "./view-model/box-view-model";
import { ListBoxes } from "src/application/box/useCases/listBoxes";

@Controller("boxes")
export class BoxController {
  constructor(
    private readonly createBox: CreateBox,
    private readonly listBoxes: ListBoxes
  ) { }

  @Post()
  async create(
    @Body() body: CreateBoxBody,
    @Cookies(CookiesEnum.CompanyId) companyId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    const box = await this.createBox.execute(companyInstance, body);
    return BoxViewModel.tohttp(box);
  }

  @Get()
  async list(@Cookies(CookiesEnum.CompanyId) companyId: string) {
    const companyInstance = CompanyInstance.create(companyId);
    const boxes = await this.listBoxes.execute(companyInstance);
    return boxes.map(BoxViewModel.tohttp)
  }
}