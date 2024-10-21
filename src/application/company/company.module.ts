import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateCompany } from 'src/domain/company/useCases/createCompany.use-case';
import { GetManyCompanies } from 'src/domain/company/useCases/getManyCompanies.use-case';
import { CheckUserMembership } from 'src/domain/memberShip/useCases/checkUserMembership';

@Module({
  controllers: [CompanyController],
  imports: [DatabaseModule],
  providers: [CreateCompany, GetManyCompanies, CheckUserMembership],
})
export class CompanyModule {}
