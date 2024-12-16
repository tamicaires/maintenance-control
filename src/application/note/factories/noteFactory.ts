import { Note } from '../../../core/domain/entities/note';

type Override = Partial<Note>;

export const makeNote = ({ id, ...override }: Override) => {
  return new Note(
    {
      content: 'Dar like no video',
      userId: '123456',
      description: 'Se inscreva no canal',
      workOrderId:'id',
      ...override,
    },
    id,
  );
};
