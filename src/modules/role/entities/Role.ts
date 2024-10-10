import { randomUUID } from 'crypto';
import { RoleEnum, TRole } from '../enum/role.enum';

interface RoleProps {
  name: TRole;
}

export class Role {
  private props: RoleProps;
  private _id: string;

  constructor(props: RoleProps, id?: string) {
    this.props = {
      ...props,
    };

    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get name(): TRole {
    return this.props.name;
  }

  set name(name: TRole) {
    this.props.name = name;
  }
}
