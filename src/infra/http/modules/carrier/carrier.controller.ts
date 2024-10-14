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
import { CreateCarrier } from 'src/modules/carrier/useCases/createCarrier/createCarrier';
import { CreateCarrierBody } from './dtos/createCarrierBody';
import { CarrierViewModel } from './viewModels/CarrierViewModel';
import { EditCarrier } from 'src/modules/carrier/useCases/editCarrier/editCarrier';
import { EditCarrierBody } from './dtos/editCarrierBody';
import { DeleteCarrier } from 'src/modules/carrier/useCases/deleteCarrier/deleteCarrier';
import { GetCarrier } from 'src/modules/carrier/useCases/getCarrier/getCarrier';
import { GetManyCarriers } from 'src/modules/carrier/useCases/getAllCarrriers/getManyCarriers';
import { AuthenticatedRequestModel } from '../auth/models/authenticateRequestModel';

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
  async createCarrier(
    @Body() body: CreateCarrierBody,
  ) {
    const carrier = await this.createCarrierUseCase.execute({
      ...body,
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
  async getManyCarriers(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
  ) {
    const carriers = await this.getManyCarriersUseCase.execute({
      page,
      perPage,
    });

    return carriers?.map(CarrierViewModel.toHttp);
  }
}
