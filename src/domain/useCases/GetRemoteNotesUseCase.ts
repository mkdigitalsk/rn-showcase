import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { RemoteNote } from '../model/RemoteNote';
import { RemoteNoteRepository } from '../repositories/RemoteNoteRepository';
import { TYPES } from '../../app/diTypes';
import { UseCase } from './base/UseCase';

@injectable()
export class GetRemoteNotesUseCase extends UseCase<void, RemoteNote[]> {
  constructor(@inject(TYPES.RemoteNoteRepository) private repository: RemoteNoteRepository) {
    super();
  }

  protected async run(): Promise<RemoteNote[]> {
    return this.repository.getNotes();
  }
}
