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

@Controller('service-assignments')
export class ServiceAssignmentController {
  constructor(
    private createServiceAssignment: CreateServiceAssignment,
    private updateServiceAssignment: UpdateServiceAssignment,
    private deleteServiceAssignment: DeleteServiceAssignment,
    private getServiceAssignment: GetServiceAssignment,
    private getManyServiceAssignment: GetManyServiceAssignments,
  ) { }

  @Post()
  async create(@Body() body: CreateServiceAssignmentBody) {
    const { workOrderId, serviceId, employeeId, startAt, endAt } = body;

    const serviceAssignment = await this.createServiceAssignment.execute({
      workOrderId,
      serviceId,
      employeeId,
      startAt,
      endAt
    });

    return serviceAssignment;
  }

  @Put(':id')
  async update(
    @Param('id') serviceAssignmentId: string,
    @Body() body: UpdateServiceAssignmentBody,
  ) {
    const { workOrderId, serviceId, employeeId, startAt, endAt } = body;

    const serviceAssignment = await this.updateServiceAssignment.execute({
      serviceAssignmentId: serviceAssignmentId,
      workOrderId,
      serviceId,
      employeeId,
      startAt, 
      endAt
    });

    return serviceAssignment;
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
}