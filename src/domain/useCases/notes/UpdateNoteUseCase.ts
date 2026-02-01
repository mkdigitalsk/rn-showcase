import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { NoteRepository } from '../../repositories/NoteRepository';
import { Note } from '../../model/Note';
import { TYPES } from '../../../app/diTypes';

@injectable()
export class UpdateNoteUseCase extends UseCase<Note, void> {
  constructor(
    @inject(TYPES.NoteRepository) private noteRepository: NoteRepository,
  ) {
    super();
  }

  protected async run(note: Note): Promise<void> {
    return this.noteRepository.update(note);
  }
}
