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
import { ServiceCategory } from 'src/core/enum/service-category.enum';

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
  async create(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Body() createServiceBody: CreateServiceBody
  ) {
    const companyInstance = CompanyInstance.create(companyId);

    return await this.createService.execute(companyInstance, createServiceBody);
  }

  @Put(':id')
  async update(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Param('id') serviceId: string,
    @Body() updateServiceBody: UpdateServiceBody,
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    return await this.updateService.execute(companyInstance, {
      ...updateServiceBody,
      serviceId
    });
  }

  @Delete(':id')
  async delete(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Param('id') serviceId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    await this.deleteService.execute(
      companyInstance,
      serviceId,
    );
  }

  @Get(':id')
  async getOne(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Param('id') serviceId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId);

    return await this.getService.execute(
      companyInstance,
      serviceId
    );
  }

  @Get()
  async getMany(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('serviceName') serviceName: string,
    @Query('serviceCategory') serviceCategory: ServiceCategory,
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    const queries = {
      page,
      perPage,
      serviceCategory,
      serviceName
    }

    const services = await this.getManyServices.execute(
      companyInstance,
      queries
    );

    return ServiceViewModel.toHttpWithCount(services);
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
