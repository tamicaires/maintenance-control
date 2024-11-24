import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateServiceBody } from './dtos/createServiceBody';
import { UpdateServiceBody } from './dtos/updateServiceBody';
import { ServiceViewModel } from './viewModels/ServiceViewModel';
import { ServiceWithEmployeeViewModel } from './viewModels/ServiceWithEmployee';
import { CreateService } from 'src/application/service/useCases/createService/createService';
import { DeleteService } from 'src/application/service/useCases/deleteService/deleteService';
import { GetManyServices } from 'src/application/service/useCases/getManyServices/getManyServices';
import { GetService } from 'src/application/service/useCases/getService/getService';
import { GetServicesByWorkOrder } from 'src/application/service/useCases/getServicesByWorkOrder/getServicesByWorkOrder.use-case';
import { UpdateService } from 'src/application/service/useCases/updateService/updateService';
import { Cookies } from 'src/infra/http/auth/decorators/cookies.decorator';
import { CompanyInstance } from 'src/core/company/company-instance';
import { CookiesEnum } from 'src/core/enum/cookies';

@Controller('services')
export class ServiceController {
  constructor(
    private createService: CreateService,
    private updateService: UpdateService,
    private deleteService: DeleteService,
    private getService: GetService,
    private getManyServices: GetManyServices,
    private _getServicesByWorkOrder: GetServicesByWorkOrder,
  ) { }

  @Post()
  async create(@Body() createServiceBody: CreateServiceBody) {
    const { serviceCategory, serviceName } = createServiceBody;

    const service = await this.createService.execute({
      serviceCategory,
      serviceName,
    });

    return service;
  }

  @Put(':id')
  async update(
    @Param('id') serviceId: string,
    @Body() updateServiceBody: UpdateServiceBody,
  ) {
    const { serviceCategory, serviceName } = updateServiceBody;

    const service = await this.updateService.execute({
      serviceId: serviceId,
      serviceCategory,
      serviceName,
    });

    return service;
  }

  @Delete(':id')
  async delete(@Param('id') serviceId: string) {
    await this.deleteService.execute({
      serviceId,
    });
  }

  @Get(':id')
  async getOne(@Param('id') serviceId: string) {
    const service = await this.getService.execute({
      serviceId: serviceId,
    });

    return service;
  }

  @Get()
  async getMany(
    @Query('filter') filter: string,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
  ) {
    const services = await this.getManyServices.execute({
      filter,
      page,
      perPage,
    });

    return services.map(ServiceViewModel.toHttp);
  }

  @Get(':workOrderId/services')
  async getWorkOrderServices(
    @Param('workOrderId') workOrderId: string,
    @Cookies(CookiesEnum.CompanyId) companyId: string,
  ) {
    const companyInstance = CompanyInstance.create(companyId);

    const services = await this._getServicesByWorkOrder.execute(
      companyInstance,
      workOrderId
    );

    return services.map(ServiceWithEmployeeViewModel.toHttp);
  }
}
