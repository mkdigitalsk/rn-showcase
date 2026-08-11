import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { RemoteNote } from '../model/RemoteNote';
import { RemoteNoteRepository } from '../repositories/RemoteNoteRepository';
import { TYPES } from '../../app/diTypes';
import { UseCase } from './base/UseCase';

export interface UpdateRemoteNoteParams {
  id: number;
  title: string;
  content: string;
  etag: string;
}

@injectable()
export class UpdateRemoteNoteUseCase extends UseCase<UpdateRemoteNoteParams, RemoteNote> {
  constructor(@inject(TYPES.RemoteNoteRepository) private repository: RemoteNoteRepository) {
    super();
  }

  protected async run(params: UpdateRemoteNoteParams): Promise<RemoteNote> {
    return this.repository.updateNote(params.id, params.title, params.content, params.etag);
  }
}
