import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { SessionData } from 'src/infra/http/modules/auth/models/sessionModel';

@Injectable()
export class GetCurrentMembership {
  async execute(session: SessionData) {
    const currentMembership = session.currentMembership

    if (!currentMembership) {
      throw new NotFoundException("Não há empresa definida na sessão");
    }

    return currentMembership;
  }
}
