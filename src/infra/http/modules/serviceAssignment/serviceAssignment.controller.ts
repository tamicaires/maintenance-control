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
import { CreateServiceAssignment } from 'src/domain/serviceAssignment/useCases/createServiceAssignment/createServiceAssignment';
import { UpdateServiceAssignment } from 'src/domain/serviceAssignment/useCases/updateServiceAssignment/updateServiceAssignment';
import { DeleteServiceAssignment } from 'src/domain/serviceAssignment/useCases/deleteServiceAssignment/deleteServiceAssignment';
import { GetServiceAssignment } from 'src/domain/serviceAssignment/useCases/getServiceAssignment/getServiceAssignment';
import { GetManyServiceAssignments } from 'src/domain/serviceAssignment/useCases/getManyServiceAssignments/getManyServiceAssignments';

@Controller('service-assignments')
export class ServiceAssignmentController {
  constructor(
    private createServiceAssignment: CreateServiceAssignment,
    private updateServiceAssignment: UpdateServiceAssignment,
    private deleteServiceAssignment: DeleteServiceAssignment,
    private getServiceAssignment: GetServiceAssignment,
    private getManyServiceAssignment: GetManyServiceAssignments,
  ) {}

  @Post()
  async create(@Body() body: CreateServiceAssignmentBody) {
    const { workOrderId, serviceId, employeeId } = body;

    const serviceAssignment = await this.createServiceAssignment.execute({
      workOrderId,
      serviceId,
      employeeId,
    });

    return serviceAssignment;
  }

  @Put(':id')
  async update(
    @Param('id') serviceAssignmentId: string,
    @Body() body: UpdateServiceAssignmentBody,
  ) {
    const { workOrderId, serviceId, employeeId } = body;

    const serviceAssignment = await this.updateServiceAssignment.execute({
      serviceAssignmentId: serviceAssignmentId,
      workOrderId,
      serviceId,
      employeeId,
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
