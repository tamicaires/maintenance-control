export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export interface Rule {
  action: Action;
  subject: string;
}

export class Ability {
  private rules: Rule[] = [];

  can(action: Action, subject: string): boolean {
    return this.rules.some(rule => rule.action === action && rule.subject === subject);
  }

  cannot(action: Action, subject: string): boolean {
    return !this.can(action, subject);
  }

  addRule(rule: Rule) {
    this.rules.push(rule);
  }

  build() {
    return this;
  }
}
