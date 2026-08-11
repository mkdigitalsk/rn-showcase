import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { RemoteNoteRepository } from '../repositories/RemoteNoteRepository';
import { TYPES } from '../../app/diTypes';
import { UseCase } from './base/UseCase';

@injectable()
export class DeleteRemoteNoteUseCase extends UseCase<number, void> {
  constructor(@inject(TYPES.RemoteNoteRepository) private repository: RemoteNoteRepository) {
    super();
  }

  protected async run(id: number): Promise<void> {
    return this.repository.deleteNote(id);
  }
}
