import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
 import { User } from 'src/modules/user/entities/User';
import { Ability, Action, Rule } from '../../ability/ability.factory';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(private readonly ability: Ability) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; 
    console.log("user do guard", user);

    // Construa as regras de permissão para o usuário
    this.setupUserPermissions(user);

    // Verifique se o usuário tem permissão para a rota
    const requiredPermissions = this.getRequiredPermissions(context);

    for (const permission of requiredPermissions) {
      if (this.ability.cannot(permission.action, permission.subject)) {
        throw new ForbiddenException('Você não tem permissão para acessar este recurso.');
      }
    }

    return true; // Permissão concedida
  }

  private setupUserPermissions(user: User) {
    // Exemplo: Definindo as regras de permissão do usuário
    // Aqui, você pode definir a lógica de regras baseada nas funções ou no perfil do usuário
    this.ability.addRule({ action: Action.Read, subject: 'Fleet' }); // Exemplo
    this.ability.addRule({ action: Action.Create, subject: 'Carrier' }); // Exemplo
    // Adicione outras regras conforme necessário
  }

  private getRequiredPermissions(context: ExecutionContext): Rule[] {
    // Aqui você pode implementar lógica para extrair permissões necessárias com base na rota
    const handler = context.getHandler();
    // Por exemplo, você pode usar decorators para definir as permissões
    const requiredPermissions = Reflect.getMetadata('permissions', handler) || [];
    return requiredPermissions;
  }
}
