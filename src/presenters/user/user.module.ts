import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateUser } from 'src/application/user/useCases/createUser';
import { GetUserWithRoles } from 'src/application/user/useCases/getUserWithRoles';
import { ListUsers } from 'src/application/user/useCases/listUsers';

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
