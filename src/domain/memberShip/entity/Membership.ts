import { randomUUID } from 'crypto';
import { TRole } from 'src/core/enum/role.enum';

interface MembershipProps {
  userId: string;
  companyId: string;
  role: TRole[];
}

export class Membership {
  private props: MembershipProps;
  private _id: string;

  constructor(
    props: MembershipProps,
    id?: string,
  ) {
    this.props = {
      ...props,
    };

    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this.props.userId;
  }

  set userId(userId: string) {
    this.props.userId = userId;
  }

  get companyId(): string {
    return this.props.companyId;
  }

  set companyId(companyId: string) {
    this.props.companyId = companyId;
  }

  get role(): TRole[] {
    return this.props.role;
  }

  set role(role: TRole[]) {
    this.props.role = role;
  }
}
