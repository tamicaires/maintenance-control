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
  UseGuards,
} from '@nestjs/common';
import { CreateCarrierBody } from './dtos/createCarrierBody';
import { EditCarrierBody } from './dtos/editCarrierBody';
import { CarrierViewModel } from './viewModels/CarrierViewModel';
import { CookiesEnum } from 'src/core/enum/cookies';
import { Permission } from 'src/infra/http/auth/decorators/permissions.decorator';
import { Action } from 'src/infra/http/ability/ability';
import { Cookies } from 'src/infra/http/auth/decorators/cookies.decorator';
import { CompanyInstance } from 'src/core/company/company-instance';
import { PolicyGuard } from 'src/infra/http/auth/guards/policy.guard';
import { CreateCarrier } from 'src/application/carrier/useCases/createCarrier/createCarrier';
import { DeleteCarrier } from 'src/application/carrier/useCases/deleteCarrier/deleteCarrier';
import { EditCarrier } from 'src/application/carrier/useCases/editCarrier/editCarrier';
import { GetManyCarriers } from 'src/application/carrier/useCases/getAllCarrriers/getManyCarriers';
import { GetCarrier } from 'src/application/carrier/useCases/getCarrier/getCarrier';

@Controller('carriers')
@UseGuards(PolicyGuard)
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
    const companyInstance = CompanyInstance.create(companyId);
    const carrier = await this.createCarrierUseCase.execute(companyInstance, body);

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
  @Permission(Action.Delete, "Carrier")
  async getManyCarriers(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Cookies(CookiesEnum.CompanyId) companyId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    const carriers = await this.getManyCarriersUseCase.execute({
      companyInstance,
      page,
      perPage,
    });

    return carriers?.map(CarrierViewModel.toHttp);
  }
}
 