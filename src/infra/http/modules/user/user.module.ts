import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUser } from 'src/modules/user/useCases/createUser';
import { DatabaseModule } from 'src/infra/database/database.module';
import { AssociateUserToCompany } from 'src/modules/company/useCases/associateUserToCompany.use-case';
import { AssignUserToRole } from 'src/modules/user/useCases/assignUserToRole';
import { GetUserWithRoles } from 'src/modules/user/useCases/getUserWithRoles';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUser, AssociateUserToCompany, AssignUserToRole, GetUserWithRoles],
})
export class UserModule { }
