import { TSubject } from 'src/core/enum/subject.enum';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  View_Report = 'view report',
  Export = 'export',
}

export interface Rule {
  action: Action;
  subject: TSubject;
  conditions?: Record<string, any>;
  inverted?: boolean;
}

export class Ability {
  private rules: Rule[] = [];

  constructor(rules: Rule[]) {
    this.rules = rules;
  }

  can(action: Action, subject: TSubject, conditions?: Record<string, any>): boolean {
    const denied = this.rules.some(rule => {
      rule.inverted && rule.action === action && rule.subject === subject &&
        (!conditions || this.checkConditions(conditions, rule));
    });

    if (denied) {
      return false;
    }

    return this.rules.some(rule => !rule.inverted && rule.action === action && rule.subject === subject &&
      (!conditions || this.checkConditions(conditions, rule)));
  }

  cannot(action: Action, subject: TSubject): boolean {
    return !this.can(action, subject);
  }

  private checkConditions(conditions: Record<string, any>, rule: { conditions?: Record<string, any> }): boolean {
    return Object.entries(conditions).every(([key, value]) => rule.conditions?.[key] === value
    );
  }

}
