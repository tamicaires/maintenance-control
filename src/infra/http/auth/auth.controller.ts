import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthRequestModel } from './models/authRequestModel';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { Public } from './decorators/is-public.decorator';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/domain/user/entities/User';
import { SignInUseCase } from 'src/domain/auth/useCases/signInUseCase/signInUseCase';

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
    return { access_token };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: User) {
    return user;
  }
}