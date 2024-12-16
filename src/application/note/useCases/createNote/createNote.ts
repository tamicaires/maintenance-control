import { HttpStatus, Injectable } from '@nestjs/common';
import { Note } from '../../../../core/domain/entities/note';
import { NoteRepository } from '../../../../core/domain/repositories/note-repository';
import { CompanyInstance } from 'src/core/company/company-instance';
import { WorkOrderRepository } from 'src/core/domain/repositories/work-order-repository';
import { ExceptionHandler } from 'src/core/exceptions/ExceptionHandler';

interface CreateNoteRequest {
  content: string;
  description?: string;
  userId: string;
  workOrderId: string;
}

@Injectable()
export class CreateNote {
  constructor(
    private readonly _noteRepository: NoteRepository,
    private readonly _workOrderRepository: WorkOrderRepository
  ) { }

  async execute(companyInstance: CompanyInstance, noteData: CreateNoteRequest) {
    const workOrder = await this._workOrderRepository.findById(companyInstance, noteData.workOrderId);
    if (!workOrder) {
      throw new ExceptionHandler({
        message: "Ordem de serviço não encontrada, não foi possivel registrar nota",
        status: HttpStatus.NOT_FOUND
      })
    }

    const note = new Note({
      userId: noteData.userId,
      content: noteData.content,
      description: noteData.description,
      workOrderId: noteData.workOrderId
    });

    await this._noteRepository.create(note);

    return note;
  }
}
