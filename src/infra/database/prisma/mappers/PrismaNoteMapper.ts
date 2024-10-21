import { Note as NoteRaw } from '@prisma/client';
import { Note } from 'src/domain/note/entities/Note';

export class PrismaNoteMapper {
  static toPrisma({
    id,
    title,
    description,
    userId,
    workOrderId,
    createdAt,
    updatedAt,
  }: Note): NoteRaw {
    return { id, title, description, userId, workOrderId, createdAt, updatedAt };
  }

  static toDomain({
    id,
    title,
    description,
    userId,
    workOrderId,
    createdAt,
    updatedAt,
  }: NoteRaw): Note {
    return new Note(
      {
        title,
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
