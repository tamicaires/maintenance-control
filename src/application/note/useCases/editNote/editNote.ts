import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../../../core/domain/repositories/note-repository';
import { NoteWithoutPermissionException } from '../../exceptions/NoteWithoudPermissionException';
import { NoteNotFoundException } from '../../exceptions/NoteNotFoundException';

interface EditNoteRequest {
  content: string;
  description?: string;
  noteId: string;
  userId: string;
}
@Injectable()
export class EditNote {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ description, noteId, content, userId }: EditNoteRequest) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) throw new NoteNotFoundException();

    if (note.userId !== userId)
      throw new NoteWithoutPermissionException({
        actionName: 'editar',
      });

    note.content = content;
    note.description = description ?? null;

    await this.noteRepository.save(note);

    return note;
  }
}
