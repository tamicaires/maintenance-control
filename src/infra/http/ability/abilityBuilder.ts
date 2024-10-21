import { TSubject } from "src/core/enum/subject.enum";
import { Ability, Action, Rule } from "./ability";

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
  