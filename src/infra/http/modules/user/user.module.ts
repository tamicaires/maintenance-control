import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUser } from 'src/modules/user/useCases/createUser';
import { DatabaseModule } from 'src/infra/database/database.module';
import { GetUserWithRoles } from 'src/modules/user/useCases/getUserWithRoles';
import { ListUsers } from 'src/modules/user/useCases/listUsers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    CreateUser,
    ListUsers,
    GetUserWithRoles
  ],
})
export class UserModule { }
