import { Ability, Action, Rule } from "./ability";
import { TSubject } from "./enums/subject.enum";

export class AbilityBuilder {
  private rules: Rule[] = [];

  can(action: Action, subject: TSubject, conditions?: Record<string, any>) {
    this.rules.push({ action, subject, conditions });
  }

  cannot(action: Action, subject: TSubject, conditions?: Record<string, any>) {
    this.rules.push({ action, subject, conditions });
  }

  build(): Ability {
    return new Ability(this.rules);
  }
}
  