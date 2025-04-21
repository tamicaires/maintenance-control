import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { CreateBox } from "src/application/box/useCases/create-box";
import { CreateBoxBody } from "./dto/create-box-body";
import { Cookies } from "src/infra/http/auth/decorators/cookies.decorator";
import { CookiesEnum } from "src/core/enum/cookies";
import { CompanyInstance } from "src/core/company/company-instance";
import { BoxViewModel } from "./view-model/box-view-model";
import { ListBoxes } from "src/application/box/useCases/listBoxes";
import { GetBoxesWithRelationalData } from "src/application/box/useCases/get-boxes-with-relational-data";
import { DeleteBox } from "src/application/box/useCases/delete-box";

@Controller("boxes")
export class BoxController {
  constructor(
    private readonly _createBox: CreateBox,
    private readonly _listBoxes: ListBoxes,
    private readonly _getBoxWithRelationalData: GetBoxesWithRelationalData,
    private readonly _deleteBox: DeleteBox,
  ) { }

  @Post()
  async create(
    @Body() body: CreateBoxBody,
    @Cookies(CookiesEnum.CompanyId) companyId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    const box = await this._createBox.execute(companyInstance, body);
    return BoxViewModel.tohttp(box);
  }

  @Get('relational')
  async getByWithRelationalData(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    return await this._getBoxWithRelationalData.execute(companyInstance)
  }

  @Get()
  async list(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Query('page') page?: string,
    @Query('perPage') perPage?: string,
    @Query('boxName') boxName?: string,
    @Query('isActive') isActive?: boolean,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const queries = {
      page,
      perPage,
      boxName,
      isActive,
      startDate,
      endDate,
    }
    const companyInstance = CompanyInstance.create(companyId);
    const boxes = await this._listBoxes.execute(
      companyInstance,
      queries
    );
    return BoxViewModel.toHttpWithCount(boxes);
  }

  @Delete(":id")
  async delete(
    @Param("id") id: string,
    @Cookies(CookiesEnum.CompanyId) companyId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    await this._deleteBox.execute(companyInstance, id);
  }
}