import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthControler } from './auth.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { signInDTOValidateMiddleware } from './middleware/signInDTOValidate.middleware';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { jwtKeys } from 'src/core/config/constants';
import { LocalStrategy } from 'src/domain/auth/strategies/local.strategy';
import { JwtStrategy } from 'src/domain/auth/strategies/jwtStrategy';
import { SignInUseCase } from 'src/domain/auth/useCases/signInUseCase/signInUseCase';
import { ValidateUserUseCase } from 'src/domain/auth/useCases/validateUser/validateUserUseCase';
import { UserModule } from 'src/application/user/user.module';

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
