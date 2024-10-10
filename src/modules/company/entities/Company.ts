import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

interface CompanySchema {
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  address: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Company {
  private props: CompanySchema;
  private _id: string;

  constructor(
    props: Replace<CompanySchema, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    (this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
      updatedAt: new Date(),
    }),
      (this._id = id || randomUUID());
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

  get cnpj(): string {
    return this.props.cnpj;
  }

  set cnpj(cnpj: string) {
    this.props.cnpj = cnpj;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get phone(): string {
    return this.props.phone;
  }

  set phone(phone: string) {
    this.props.phone = phone;
  }

  get address(): string | null {
    return this.props.address;
  }

  set address(address: string | null) {
    this.props.address = address;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }
}
