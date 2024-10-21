import { randomUUID } from "crypto";
import { Replace } from "src/shared/utils/replace";

interface PartCategorySchema {
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class PartCategory {
  private _id: string;
  private props: PartCategorySchema;

  constructor(
    props: Replace<PartCategorySchema,
      { createdAt?: Date, updatedAt?: Date, description?: string | null }>,
    id?: string
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: new Date(),
      description: props.description ?? null,
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