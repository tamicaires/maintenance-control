import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CreateCarrier } from "src/modules/carrier/useCases/createCarrier/createCarrier";
import { CreateCarrierBody } from "./dtos/createCarrierBody";
import { CarrierViewModel } from "./viewModels/CarrierViewModel";
import { EditCarrier } from "src/modules/carrier/useCases/editCarrier/editCarrier";
import { EditCarrierBody } from "./dtos/editCarrierBody";
import { DeleteCarrier } from "src/modules/carrier/useCases/deleteCarrier/deleteCarrier";
import { GetCarrier } from "src/modules/carrier/useCases/getCarrier/getCarrier";
import { GetManyCarriers } from "src/modules/carrier/useCases/getAllCarrriers/getManyCarriers";
import { AuthorizationGuard } from "../auth/guards/authorization.guard";
import { Role } from "../auth/decorators/roles.decorator";

@Controller('carriers')
export class CarrierController {
  constructor(
    private createCarrierUseCase: CreateCarrier,
    private editCarrierUseCase: EditCarrier,
    private deleteCarrierUseCase: DeleteCarrier,
    private getCarrierUseCase: GetCarrier,
    private getManyCarriersUseCase: GetManyCarriers
  ) {}

  @Post()
  @UseGuards(AuthorizationGuard)
  @Role('ADMIN')
  async createCarrier(
    @Body() body: CreateCarrierBody) {
    const {
      carrierName,
      managerName,
      managerPhone, 
      status
    } = body;

    const carrier = await this.createCarrierUseCase.execute({
      carrierName,
      managerName, 
      managerPhone, 
      status
    });

    return CarrierViewModel.toHttp(carrier);
  };

  @Put(':id')
  @UseGuards(AuthorizationGuard)
  @Role('ADMIN')
  async editCarrier(
    @Param('id') carrierId: string,
    @Body() body: EditCarrierBody
  ) {
    const { carrierName, managerName, managerPhone, status } = body; 

    await this.editCarrierUseCase.execute({
      carrierId,
      carrierName, 
      managerName, 
      managerPhone, 
      status
    });
  };

  @Delete(':id')
  @UseGuards(AuthorizationGuard)
  @Role('ADMIN')
  async deleteCarrier(
    @Param('id') carrierId: string
  ) {
    await this.deleteCarrierUseCase.execute({ carrierId });
  };

  @Get(':id')
  async getCarrier(
    @Param('id') carrierId: string
  ) {
    const carrier = await this.getCarrierUseCase.execute({
      carrierId
    });

    return CarrierViewModel.toHttp(carrier);
  };

  @Get()
  async getManyCarriers(
    @Query('page') page: string,
    @Query('perPage') perPage: string 
  ) {
    const carriers = await this.getManyCarriersUseCase.execute({
      page,
      perPage
    });

    return carriers?.map(CarrierViewModel.toHttp)
  };
};