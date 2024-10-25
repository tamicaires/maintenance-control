import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { FleetController } from './fleet.controller';
import { CreateFleet } from 'src/application/fleet/useCases/createFleet/createFleet';
import { DeleteFleet } from 'src/application/fleet/useCases/deleteFleet/deleteFleet';
import { EditFleet } from 'src/application/fleet/useCases/editFleet/editFleet';
import { GetFleet } from 'src/application/fleet/useCases/getFleet/getFleet';
import { GetManyFleets } from 'src/application/fleet/useCases/getManyFleets/getManyFleets';
import { CheckUserMembership } from 'src/application/membership/useCases/checkUserMembership';


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
