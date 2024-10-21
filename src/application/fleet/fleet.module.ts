import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { FleetController } from './fleet.controller';
import { CreateFleet } from 'src/domain/fleet/useCases/createFleet/createFleet';
import { DeleteFleet } from 'src/domain/fleet/useCases/deleteFleet/deleteFleet';
import { EditFleet } from 'src/domain/fleet/useCases/editFleet/editFleet';
import { GetFleet } from 'src/domain/fleet/useCases/getFleet/getFleet';
import { GetManyFleets } from 'src/domain/fleet/useCases/getManyFleets/getManyFleets';
import { CheckUserMembership } from 'src/domain/memberShip/useCases/checkUserMembership';

@Module({
  imports: [DatabaseModule],
  controllers: [FleetController],
  providers: [
    CreateFleet,
    EditFleet,
    DeleteFleet,
    GetFleet,
    GetManyFleets,
    CheckUserMembership
  ],
})
export class FleetModule { }
