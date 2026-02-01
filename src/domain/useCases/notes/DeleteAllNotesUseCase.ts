import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { NoteRepository } from '../../repositories/NoteRepository';
import { TYPES } from '../../../app/diTypes';

@injectable()
export class DeleteAllNotesUseCase extends UseCase<void, void> {
  constructor(
    @inject(TYPES.NoteRepository) private noteRepository: NoteRepository,
  ) {
    super();
  }

  protected async run(): Promise<void> {
    return this.noteRepository.deleteAll();
  }
}
