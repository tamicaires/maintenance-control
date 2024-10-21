import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthRequestModel } from './models/authRequestModel';
import { SignInUseCase } from 'src/modules/auth/useCases/signInUseCase/signInUseCase';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { Public } from './decorators/is-public.decorator';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/modules/user/entities/User';
import { Response as Res } from 'express';

@Controller()
export class AuthControler {
  constructor(private signInUseCase: SignInUseCase) { }

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async signIn(
    @Request() request: AuthRequestModel,

  ) {
    const user = request.user;

    const access_token = await this.signInUseCase.execute({ user: request.user });
    // res.cookie('userId', user.id, {
    //   httpOnly: true,      // Impede o acesso via JavaScript no lado do cliente
    //   secure: process.env.NODE_ENV === 'production',  // Enviar só em conexões HTTPS
    //   maxAge: 1000 * 60 * 60 * 24,  // Expira em 1 dia
    //   sameSite: 'strict',  // Impede envio em requisições cross-site
    // });
    return { access_token };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: User) {
    return user;
  }
}
