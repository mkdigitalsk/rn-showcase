import { inject, injectable } from 'tsyringe';
import { UseCase } from '../base/UseCase';
import { NoteRepository } from '../../repositories/NoteRepository';
import { Note } from '../../model/Note';
import { TYPES } from '../../../app/diTypes';

@injectable()
export class InsertNoteUseCase extends UseCase<Omit<Note, 'id'>, void> {
  constructor(
    @inject(TYPES.NoteRepository) private noteRepository: NoteRepository,
  ) {
    super();
  }

  protected async run(note: Omit<Note, 'id'>): Promise<void> {
    return this.noteRepository.insert(note);
  }
}
