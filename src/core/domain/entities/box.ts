import { randomUUID } from 'crypto';

interface BoxProps {
  name: string;
  description: string;
  isActive: boolean;
  companyId: string;
}

export class Box {
  private props: BoxProps;
  private _id: string;

  constructor(props: BoxProps, id?: string) {
    this.props = {
      ...props,
    };

    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get description(): string {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  set isActive(isActive: boolean) {
    this.props.isActive = isActive;
  }
}
