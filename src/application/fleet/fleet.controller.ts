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
import { EditFleetBody } from './dtos/editFleetBody';
import { mapEditFleetData } from 'src/shared/utils/fleetUtils';
import { FleetViewModel } from './viewModel/FleetViewModel';
import { Request } from 'express';
import { CreateFleet } from 'src/domain/fleet/useCases/createFleet/createFleet';
import { DeleteFleet } from 'src/domain/fleet/useCases/deleteFleet/deleteFleet';
import { EditFleet } from 'src/domain/fleet/useCases/editFleet/editFleet';
import { GetFleet } from 'src/domain/fleet/useCases/getFleet/getFleet';
import { GetManyFleets } from 'src/domain/fleet/useCases/getManyFleets/getManyFleets';
import { PolicyGuard } from 'src/infra/http/auth/guards/policy.guard';
import { Permission } from 'src/infra/http/auth/decorators/permissions.decorator';
import { Action } from 'src/infra/http/ability/ability';
import { Cookies } from 'src/infra/http/auth/decorators/cookies.decorator';
import { CookiesEnum } from 'src/core/enum/cookies';
import { CompanyInstance } from 'src/core/company/company-instance';

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
  @Permission(Action.Create, 'Fleet')
  async createFleet(
    @Body() createFleetBody: CreateFleetBody,
    @Cookies(CookiesEnum.CompanyId) companyId: string
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    const fleet = await this.createFleetUseCase.execute(
      companyInstance,
      createFleetBody
    );

    return FleetViewModel.toHttp(fleet);
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
  async getFleet(@Param('id') fleetId: string) {
    const fleet = await this.getFleetUseCase.execute({ fleetId });
  }

  @Get()
  @Permission(Action.Read, 'Fleet')
  async getManyFleet(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
  ) {
    const fleets = await this.getManyFleetsUseCase.execute({ page, perPage });
    return fleets.map(FleetViewModel.toHttp);
  }
}
