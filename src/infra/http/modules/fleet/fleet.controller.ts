import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  
  UseGuards,
} from '@nestjs/common';
import { CreateFleetBody } from './dtos/createFleetBody';
import { CreateFleet } from 'src/modules/fleet/useCases/createFleet/createFleet';
import { EditFleet } from 'src/modules/fleet/useCases/editFleet/editFleet';
import { EditFleetBody } from './dtos/editFleetBody';
import { mapEditFleetData } from 'src/utils/fleetUtils';
import { DeleteFleet } from 'src/modules/fleet/useCases/deleteFleet/deleteFleet';
import { GetFleet } from 'src/modules/fleet/useCases/getFleet/getFleet';
import { FleetViewModel } from './viewModel/FleetViewModel';
import { GetManyFleets } from 'src/modules/fleet/useCases/getManyFleets/getManyFleets';
import { AuthenticatedRequestModel } from '../auth/models/authenticateRequestModel';
import { PolicyGuard } from '../auth/guards/policy.guard';
import { Permission } from '../auth/decorators/permissions.decorator';
import { Action } from '../ability/ability';
import { Cookies } from '../auth/decorators/cookies.decorator';
import { Request } from 'express';

@Controller('fleets')
@UseGuards(PolicyGuard)
export class FleetController {
  constructor(
    private createFleetUseCase: CreateFleet,
    private editFleetUseCase: EditFleet,
    private deleteFleetUseCase: DeleteFleet,
    private getFleetUseCase: GetFleet,
    private getManyFleetsUseCase: GetManyFleets,
  ) { }

  @Post()
  @Permission(Action.Read, 'Fleet')
  async createFleet(
    @Body() createFleetBody: CreateFleetBody,
    @Req() request: Request,
    @Cookies('companyId') companyId: string
  ) {
    return await this.createFleetUseCase.execute({
      ...createFleetBody,
      companyId,
    });
  }

  @Put(':id')
  async editFleet(
    @Param('id') fleetId: string,
    @Body() editFleetBody: EditFleetBody,
  ) {
    const fleetData = mapEditFleetData(editFleetBody, fleetId);
    await this.editFleetUseCase.execute(fleetData);
  }

  @Delete(':id')
  async DeleteFleet(@Param('id') fleetId: string) {
    await this.deleteFleetUseCase.execute({ fleetId });
  }

  @Get(':id')
  async getCarrier(@Param('id') fleetId: string) {
    const fleet = await this.getFleetUseCase.execute({ fleetId });
  }

  @Get()
  // @Permission(Action.Read, 'Fleet')
  async getManyCarriers(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Req() request: Request,
  ) {
    console.log('request', request.user);
    const fleets = await this.getManyFleetsUseCase.execute({ page, perPage });
    return fleets.map(FleetViewModel.toHttp);
  }
}
