import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateNote } from 'src/modules/note/useCases/createNote/createNote';
import { DeleteNote } from 'src/modules/note/useCases/deleteNote/deleteNote';
import { EditNote } from 'src/modules/note/useCases/editNote/editNote';
import { GetManyNotes } from 'src/modules/note/useCases/getManyNote/getManyNotes';
import { GetNote } from 'src/modules/note/useCases/getNote/getNote';

@Module({
  controllers: [NoteController],
  imports: [DatabaseModule],
  providers: [CreateNote, EditNote, DeleteNote, GetNote, GetManyNotes],
})
export class NoteModule {}
