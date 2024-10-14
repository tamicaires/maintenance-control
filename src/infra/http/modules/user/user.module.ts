import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUser } from 'src/modules/user/useCases/createUser';
import { DatabaseModule } from 'src/infra/database/database.module';
import { AssociateUserToCompany } from 'src/modules/company/useCases/associateUserToCompany.use-case';
import { GetUserWithRoles } from 'src/modules/user/useCases/getUserWithRoles';
import { ListUsers } from 'src/modules/user/useCases/listUsers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    CreateUser,
    ListUsers,
    AssociateUserToCompany,
    GetUserWithRoles
  ],
})
export class UserModule { }
