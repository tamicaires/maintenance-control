import { Module } from '@nestjs/common';
import { CarrierController } from './carrier.controller';
import { CreateCarrier } from 'src/modules/carrier/useCases/createCarrier/createCarrier';
import { EditCarrier } from 'src/modules/carrier/useCases/editCarrier/editCarrier';
import { DeleteCarrier } from 'src/modules/carrier/useCases/deleteCarrier/deleteCarrier';
import { GetCarrier } from 'src/modules/carrier/useCases/getCarrier/getCarrier';
import { GetManyCarriers } from 'src/modules/carrier/useCases/getAllCarrriers/getManyCarriers';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  controllers: [CarrierController],
  imports: [DatabaseModule],
  providers: [
    CreateCarrier,
    EditCarrier,
    DeleteCarrier,
    GetCarrier,
    GetManyCarriers,
  ],
})
export class CarrierModule {}
