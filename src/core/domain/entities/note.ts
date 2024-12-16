import { randomUUID } from 'crypto';
import { Replace } from 'src/shared/utils/replace';

interface NoteProps {
  content: string;
  description: string | null;
  userId: string;
  workOrderId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Note {
  private props: NoteProps;
  private _id: string;

  constructor(
    props: Replace<
      NoteProps,
      { createdAt?: Date; updatedAt?: Date; description?: string | null }
    >,
    id?: string,
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

  get content(): string {
    return this.props.content;
  }

  set content(content: string) {
    this.props.content = content;
  }

  get description(): string | null {
    return this.props.description;
  }

  set description(description: string | null) {
    this.props.description = description;
  }

  get userId(): string {
    return this.props.userId;
  }

  get workOrderId(): string {
    return this.props.workOrderId;
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
