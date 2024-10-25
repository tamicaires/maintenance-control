import { Module } from '@nestjs/common';
import { CarrierController } from './carrier.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateCarrier } from 'src/application/carrier/useCases/createCarrier/createCarrier';
import { DeleteCarrier } from 'src/application/carrier/useCases/deleteCarrier/deleteCarrier';
import { EditCarrier } from 'src/application/carrier/useCases/editCarrier/editCarrier';
import { GetManyCarriers } from 'src/application/carrier/useCases/getAllCarrriers/getManyCarriers';
import { GetCarrier } from 'src/application/carrier/useCases/getCarrier/getCarrier';
import { CheckUserMembership } from 'src/application/membership/useCases/checkUserMembership';

@Module({
  controllers: [CarrierController],
  imports: [DatabaseModule],
  providers: [
    CreateCarrier,
    EditCarrier,
    DeleteCarrier,
    GetCarrier,
    GetManyCarriers,
    CheckUserMembership
  ],
})
export class CarrierModule {}
