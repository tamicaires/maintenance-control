import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateCompany } from 'src/modules/company/useCases/createCompany.use-case';
import { GetManyCompanies } from 'src/modules/company/useCases/getManyCompanies.use-case';
import { CheckUserMembership } from 'src/modules/memberShip/useCases/checkUserMembership';

@Module({
  controllers: [CompanyController],
  imports: [DatabaseModule],
  providers: [CreateCompany, GetManyCompanies, CheckUserMembership],
})
export class CompanyModule {}
