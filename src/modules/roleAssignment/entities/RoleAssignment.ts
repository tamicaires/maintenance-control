import { randomUUID } from 'crypto';

interface RoleAssignmentProps {
  userId: string;
  roleId: string;
}

export class RoleAssignment {
  private props: RoleAssignmentProps;
  private _id: string;

  constructor(
    props: RoleAssignmentProps,
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

  get roleId(): string {
    return this.props.roleId;
  }

  set roleId(roleId: string) {
    this.props.roleId = roleId;
  }
}
