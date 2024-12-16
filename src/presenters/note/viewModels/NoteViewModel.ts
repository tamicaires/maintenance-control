import { Note } from "src/core/domain/entities/note";

export class NoteViewModel {
  static toHttp({ id, content, description, createdAt, updatedAt }: Note) {
    return {
      id,
      content,
      description,
      createdAt,
      updatedAt,
    };
  }
}
