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
import { UpdateServiceAssignmentBody } from './dtos/updateServiceAssignmentBody';
import { CreateServiceAssignmentBody } from './dtos/createServiceAssignmentsBody';
import { ServiceAssignmentViewModel } from './viewModels/ServiceAssignmentViewModel';
import { CreateServiceAssignment } from 'src/application/service-assignment/useCases/createServiceAssignment/createServiceAssignment';
import { DeleteServiceAssignment } from 'src/application/service-assignment/useCases/deleteServiceAssignment/deleteServiceAssignment';
import { GetManyServiceAssignments } from 'src/application/service-assignment/useCases/getManyServiceAssignments/getManyServiceAssignments';
import { GetServiceAssignment } from 'src/application/service-assignment/useCases/getServiceAssignment/getServiceAssignment';
import { UpdateServiceAssignment } from 'src/application/service-assignment/useCases/updateServiceAssignment/updateServiceAssignment';
import { GetServiceAssigmentByWorkOrder } from 'src/application/service-assignment/useCases/getServiceAssignmentByWorkOrder';
import { Cookies } from 'src/infra/http/auth/decorators/cookies.decorator';
import { CookiesEnum } from 'src/core/enum/cookies';
import { CompanyInstance } from 'src/core/company/company-instance';

@Controller('service-assignments')
export class ServiceAssignmentController {
  constructor(
    private createServiceAssignment: CreateServiceAssignment,
    private updateServiceAssignment: UpdateServiceAssignment,
    private deleteServiceAssignment: DeleteServiceAssignment,
    private getServiceAssignment: GetServiceAssignment,
    private getManyServiceAssignment: GetManyServiceAssignments,
    private readonly getServiceAssigmentByWorkOrder: GetServiceAssigmentByWorkOrder
  ) { }

  @Post()
  async create(@Body() body: CreateServiceAssignmentBody) {
    return await this.createServiceAssignment.execute(body);
  }

  @Put(':id')
  async update(
    @Param('id') serviceAssignmentId: string,
    @Body() body: UpdateServiceAssignmentBody,
  ) {
    return await this.updateServiceAssignment.execute({
      ...body,
      serviceAssignmentId,
    });
  }

  @Delete(':id')
  async delete(@Param('id') serviceAssignmentId: string) {
    await this.deleteServiceAssignment.execute({
      serviceAssignmentId,
    });
  }

  @Get(':id')
  async getOne(@Param('id') serviceAssignmentId: string) {
    const serviceAssignment = await this.getServiceAssignment.execute({
      serviceAssignmentId,
    });

    return serviceAssignment;
  }

  @Get()
  async getMany(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
  ) {
    const serviceAssignments = await this.getManyServiceAssignment.execute({
      page,
      perPage,
    });

    return serviceAssignments.map(ServiceAssignmentViewModel.toHttp);
  }

  @Get("work-order/:id")
  async getByWorkOrder(
    @Param('id') workOrderId: string,
    @Cookies(CookiesEnum.CompanyId) companyId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId)
    const serviceAssigments = await this.getServiceAssigmentByWorkOrder.execute(
      companyInstance,
      workOrderId
    )
    return serviceAssigments.map(ServiceAssignmentViewModel.toHttpWithRelationalInfo)
  }
}
