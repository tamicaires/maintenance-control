import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { AuthenticatedRequestModel } from '../auth/models/authenticateRequestModel';
import { CreateNoteBody } from './dtos/createNoteBody';
import { NoteViewModel } from './viewModels/NoteViewModel';
import { EditNoteBody } from './dtos/editNoteBody';
import { CreateNote } from 'src/domain/note/useCases/createNote/createNote';
import { DeleteNote } from 'src/domain/note/useCases/deleteNote/deleteNote';
import { EditNote } from 'src/domain/note/useCases/editNote/editNote';
import { GetManyNotes } from 'src/domain/note/useCases/getManyNote/getManyNotes';
import { GetNote } from 'src/domain/note/useCases/getNote/getNote';

@Controller('notes')
export class NoteController {
  constructor(
    private createNoteUseCase: CreateNote,
    private editNoteUseCase: EditNote,
    private deleteNoteUseCase: DeleteNote,
    private getNoteUseCase: GetNote,
    private getManyNoteUseCase: GetManyNotes,
  ) {}

  @Post()
  async createNote(
    @Request() request: AuthenticatedRequestModel,
    @Body() body: CreateNoteBody,
  ) {
    const { title, description } = body;

    const note = await this.createNoteUseCase.execute({
      title,
      userId: request.user.id,
      description,
    });

    return NoteViewModel.toHttp(note);
  }

  @Put(':id')
  async editNote(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') noteId: string,
    @Body() body: EditNoteBody,
  ) {
    const { title, description } = body;

    await this.editNoteUseCase.execute({
      noteId,
      title,
      userId: request.user.id,
      description,
    });
  }

  @Delete(':id')
  async deleteNote(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') noteId: string,
  ) {
    await this.deleteNoteUseCase.execute({
      noteId,
      userId: request.user.id,
    });
  }

  @Get(':id')
  async getNote(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') noteId: string,
  ) {
    const note = await this.getNoteUseCase.execute({
      noteId,
      userId: request.user.id,
    });

    return NoteViewModel.toHttp(note);
  }

  @Get()
  async getManyNotes(
    @Request() request: AuthenticatedRequestModel,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
  ) {
    const notes = await this.getManyNoteUseCase.execute({
      userId: request.user.id,
      page,
      perPage,
    });

    return notes.map(NoteViewModel.toHttp);
  }
}
