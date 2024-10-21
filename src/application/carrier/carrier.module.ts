import { Module } from '@nestjs/common';
import { CarrierController } from './carrier.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateCarrier } from 'src/domain/carrier/useCases/createCarrier/createCarrier';
import { DeleteCarrier } from 'src/domain/carrier/useCases/deleteCarrier/deleteCarrier';
import { EditCarrier } from 'src/domain/carrier/useCases/editCarrier/editCarrier';
import { GetManyCarriers } from 'src/domain/carrier/useCases/getAllCarrriers/getManyCarriers';
import { GetCarrier } from 'src/domain/carrier/useCases/getCarrier/getCarrier';

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
