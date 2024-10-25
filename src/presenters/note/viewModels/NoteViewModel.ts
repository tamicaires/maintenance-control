import { Note } from "src/core/domain/entities/note";

export class NoteViewModel {
  static toHttp({ id, title, description, createdAt, updatedAt }: Note) {
    return {
      id,
      title,
      description,
      createdAt,
      updatedAt,
    };
  }
}
