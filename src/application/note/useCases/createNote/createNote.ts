import { Injectable } from '@nestjs/common';
import { Note } from '../../../../core/domain/entities/note';
import { NoteRepository } from '../../../../core/domain/repositories/note-repository';

interface CreateNoteRequest {
  title: string;
  description?: string;
  userId: string;
}

@Injectable()
export class CreateNote {
  constructor(private noteRepository: NoteRepository) {}
  async execute({ title, description, userId }: CreateNoteRequest) {
    const note = new Note({
      userId,
      description,
      title,
      workOrderId: 'alterar'
    });

    await this.noteRepository.create(note);

    return note;
  }
}
