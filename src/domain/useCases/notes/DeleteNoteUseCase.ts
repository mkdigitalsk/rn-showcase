import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { NoteRepository } from '../../repositories/NoteRepository';
import { TYPES } from '../../../app/diTypes';

@injectable()
export class DeleteNoteUseCase extends UseCase<number, void> {
  constructor(
    @inject(TYPES.NoteRepository) private noteRepository: NoteRepository,
  ) {
    super();
  }

  protected async run(id: number): Promise<void> {
    return this.noteRepository.delete(id);
  }
}
