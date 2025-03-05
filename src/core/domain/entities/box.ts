import { randomUUID } from 'crypto';

interface BoxProps {
  name: string;
  description: string | null;
  isActive: boolean;
  companyId: string;
  position: number | null;
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

  get description(): string | null {
    return this.props.description;
  }

  set description(description: string | null) {
    this.props.description = description;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  set isActive(isActive: boolean) {
    this.props.isActive = isActive;
  }

  get companyId(): string {
    return this.props.companyId;
  }

  set companyId(companyId: string) {
    this.props.companyId = companyId;
  }

  get position(): number | null {
    return this.props.position;
  }

  set position(position: number | null) {
    this.props.position = position;
  }
}
