import { Note } from "src/domain/note/entities/Note";

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
