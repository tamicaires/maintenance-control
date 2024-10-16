import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthControler } from './auth.controller';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { ValidateUserUseCase } from 'src/modules/auth/useCases/validateUser/validateUserUseCase';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import { signInDTOValidateMiddleware } from './middleware/signInDTOValidate.middleware';
import { SignInUseCase } from 'src/modules/auth/useCases/signInUseCase/signInUseCase';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/modules/auth/strategies/jwtStrategy';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { jwtKeys } from 'src/config/constants';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    JwtModule.register({
      secret: jwtKeys.secret,
      signOptions: { expiresIn: jwtKeys.expires },
    }),
  ],
  controllers: [AuthControler],
  providers: [
    LocalStrategy,
    JwtStrategy,
    ValidateUserUseCase,
    SignInUseCase,
    PrismaService
  ],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(signInDTOValidateMiddleware).forRoutes('login');
  }
}
