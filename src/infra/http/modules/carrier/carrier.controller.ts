import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { CreateCarrier } from 'src/modules/carrier/useCases/createCarrier/createCarrier';
import { CreateCarrierBody } from './dtos/createCarrierBody';
import { CarrierViewModel } from './viewModels/CarrierViewModel';
import { EditCarrier } from 'src/modules/carrier/useCases/editCarrier/editCarrier';
import { EditCarrierBody } from './dtos/editCarrierBody';
import { DeleteCarrier } from 'src/modules/carrier/useCases/deleteCarrier/deleteCarrier';
import { GetCarrier } from 'src/modules/carrier/useCases/getCarrier/getCarrier';
import { GetManyCarriers } from 'src/modules/carrier/useCases/getAllCarrriers/getManyCarriers';
import { Cookies } from '../auth/decorators/cookies.decorator';
import { Permission } from '../auth/decorators/permissions.decorator';
import { Action } from '../ability/ability';
import { CookiesEnum } from 'src/core/enum/cookies';

@Controller('carriers')
export class CarrierController {
  constructor(
    private createCarrierUseCase: CreateCarrier,
    private editCarrierUseCase: EditCarrier,
    private deleteCarrierUseCase: DeleteCarrier,
    private getCarrierUseCase: GetCarrier,
    private getManyCarriersUseCase: GetManyCarriers,
  ) { }

  @Post()
  @Permission(Action.Create, "Carrier")
  async createCarrier(
    @Body() body: CreateCarrierBody,
    @Cookies(CookiesEnum.CompanyId) companyId: string
  ) {
    const carrier = await this.createCarrierUseCase.execute({
      ...body,
      companyId,
    });

    return CarrierViewModel.toHttp(carrier);
  }

  @Put(':id')
  async editCarrier(
    @Param('id') carrierId: string,
    @Body() body: EditCarrierBody,
  ) {
    return await this.editCarrierUseCase.execute({
      carrierId,
      ...body,
    });
  }

  @Delete(':id')
  async deleteCarrier(@Param('id') carrierId: string) {
    await this.deleteCarrierUseCase.execute({ carrierId });
  }

  @Get(':id')
  async getCarrier(@Param('id') carrierId: string) {
    const carrier = await this.getCarrierUseCase.execute({
      carrierId,
    });

    return CarrierViewModel.toHttp(carrier);
  }

  @Get()
  @Permission(Action.Read, "Carrier")
  async getManyCarriers(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Cookies(CookiesEnum.CompanyId) companyId: string
  ) {
    console.log("companyId", companyId);
    const carriers = await this.getManyCarriersUseCase.execute({
      page,
      perPage,
    });

    return carriers?.map(CarrierViewModel.toHttp);
  }
}
