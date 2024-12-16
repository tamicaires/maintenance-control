import { Note as NoteRaw } from '@prisma/client';
import { Note } from 'src/core/domain/entities/note';

export class PrismaNoteMapper {
  static toPrisma({
    id,
    content,
    description,
    userId,
    workOrderId,
    createdAt,
    updatedAt,
  }: Note): NoteRaw {
    return { id, content, description, userId, workOrderId, createdAt, updatedAt };
  }

  static toDomain({
    id,
    content,
    description,
    userId,
    workOrderId,
    createdAt,
    updatedAt,
  }: NoteRaw): Note {
    return new Note(
      {
        content,
        description,
        userId,
        workOrderId,
        createdAt,
        updatedAt,
      },
      id,
    );
  }
}
