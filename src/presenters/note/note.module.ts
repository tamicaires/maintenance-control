import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateNote } from 'src/application/note/useCases/createNote/createNote';
import { DeleteNote } from 'src/application/note/useCases/deleteNote/deleteNote';
import { EditNote } from 'src/application/note/useCases/editNote/editNote';
import { GetManyNotes } from 'src/application/note/useCases/getManyNote/getManyNotes';
import { GetNote } from 'src/application/note/useCases/getNote/getNote';

@Module({
  controllers: [NoteController],
  imports: [DatabaseModule],
  providers: [
    CreateNote,
    EditNote,
    DeleteNote,
    GetNote,
    GetManyNotes
  ],
})
export class NoteModule { }
