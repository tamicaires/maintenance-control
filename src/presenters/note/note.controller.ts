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
import { CreateNoteBody } from './dtos/createNoteBody';
import { NoteViewModel } from './viewModels/NoteViewModel';
import { EditNoteBody } from './dtos/editNoteBody';
import { AuthenticatedRequestModel } from 'src/infra/http/auth/models/authenticateRequestModel';
import { CreateNote } from 'src/application/note/useCases/createNote/createNote';
import { DeleteNote } from 'src/application/note/useCases/deleteNote/deleteNote';
import { EditNote } from 'src/application/note/useCases/editNote/editNote';
import { GetManyNotes } from 'src/application/note/useCases/getManyNote/getManyNotes';
import { GetNote } from 'src/application/note/useCases/getNote/getNote';
import { Cookies } from 'src/infra/http/auth/decorators/cookies.decorator';
import { CookiesEnum } from 'src/core/enum/cookies';
import { CompanyInstance } from 'src/core/company/company-instance';

@Controller('notes')
export class NoteController {
  constructor(
    private createNoteUseCase: CreateNote,
    private editNoteUseCase: EditNote,
    private deleteNoteUseCase: DeleteNote,
    private getNoteUseCase: GetNote,
    private getManyNoteUseCase: GetManyNotes,
  ) { }

  @Post()
  async createNote(
    @Request() request: AuthenticatedRequestModel,
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Body() body: CreateNoteBody,
  ) {
    const { content, description, workOrderId } = body;
    const companyInstance = CompanyInstance.create(companyId);

    const note = await this.createNoteUseCase.execute(companyInstance, {
      content,
      userId: request.user.id,
      description,
      workOrderId
    });

    return NoteViewModel.toHttp(note);
  }

  @Put(':id')
  async editNote(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') noteId: string,
    @Body() body: EditNoteBody,
  ) {
    const { content, description } = body;

    await this.editNoteUseCase.execute({
      noteId,
      content,
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
