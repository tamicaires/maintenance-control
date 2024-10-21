import { TSubject } from 'src/core/enum/subject.enum';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  View_Report = 'view report',
}

export interface Rule {
  action: Action;
  subject: TSubject;
  conditions?: Record<string, any>;
}

export class Ability {
  private rules: Rule[] = [];

  constructor(rules: Rule[]) {
    this.rules = rules;
  }

  can(action: Action, subject: TSubject, conditions?: Record<string, any>): boolean {
    return this.rules.some(rule => {
      const matchesAction = rule.action === action;
      const matchesSubject = rule.subject === subject;

      const matchesConditions = conditions ?
        Object.entries(conditions).every(([key, value]) => rule.conditions?.[key] === value)
        : true;

      return matchesAction && matchesSubject && matchesConditions;
    });
  }

  cannot(action: Action, subject: TSubject): boolean {
    return !this.can(action, subject);
  }
}

