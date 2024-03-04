import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Post, 
  Put, 
  Query 
} from "@nestjs/common";
import { CreateServiceBody } from "./dtos/createServiceBody";
import { CreateService } from "src/modules/service/useCases/createServiceUseCase/createService";
import { UpdateServiceBody } from "./dtos/updateServiceBody";
import { UpdateService } from "src/modules/service/useCases/updateServiceUseCase/updateService";
import { DeleteService } from "src/modules/service/useCases/deleteServiceUseCase/deleteService";
import { GetService } from "src/modules/service/useCases/getServiceUseCase/getService";
import { ServiceViewModel } from "./viewModels/ServiceViewModel";
import { GetManyServices } from "src/modules/service/useCases/getManyServicesUseCase/getManyServices";

@Controller('services')
export class ServiceController {
  constructor(
    private createService: CreateService,
    private updateService: UpdateService,
    private deleteService: DeleteService,
    private getService: GetService,
    private getManyServices: GetManyServices
  ){}

  @Post()
  async create(@Body() createServiceBody: CreateServiceBody){
    const { serviceCategory, serviceName } = createServiceBody;

    const service = await this.createService.execute({
      serviceCategory,
      serviceName
    });
 
    return service;
  };

  @Put(':id')
  async update(
    @Param('id') serviceId: string,
    @Body() updateServiceBody: UpdateServiceBody
  ){
    const { serviceCategory, serviceName } = updateServiceBody;

    const service = await this.updateService.execute({
      serviceId: serviceId,
      serviceCategory,
      serviceName
    });

    return service;
  };

  @Delete(':id')
  async delete(@Param('id') serviceId: string){
    await this.deleteService.execute({
      serviceId
    });
  };

  @Get(':id')
  async getOne(@Param('id') serviceId: string){
    const service = await this.getService.execute({
      serviceId: serviceId
    });

    return ServiceViewModel.toHttp(service);
  };

  @Get()
  async getMany(
    @Query('filter') filter: string,
    @Query('page') page: string,
    @Query('perPage') perPage: string
  ){
    const services = await this.getManyServices.execute({
      filter,
      page,
      perPage
    });

    return services.map(ServiceViewModel.toHttp)
  };
};