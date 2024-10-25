import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthControler } from './auth.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { signInDTOValidateMiddleware } from './middleware/signInDTOValidate.middleware';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { jwtKeys } from 'src/core/config/constants';
import { UserModule } from 'src/presenters/user/user.module';
import { LocalStrategy } from 'src/application/auth/strategies/local.strategy';
import { JwtStrategy } from 'src/application/auth/strategies/jwtStrategy';
import { SignInUseCase } from 'src/application/auth/useCases/signInUseCase/signInUseCase';
import { ValidateUserUseCase } from 'src/application/auth/useCases/validateUser/validateUserUseCase';

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
