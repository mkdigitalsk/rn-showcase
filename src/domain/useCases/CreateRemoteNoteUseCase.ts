import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { RemoteNote } from '../model/RemoteNote';
import { RemoteNoteRepository } from '../repositories/RemoteNoteRepository';
import { TYPES } from '../../app/diTypes';
import { UseCase } from './base/UseCase';

export interface CreateRemoteNoteParams {
  title: string;
  content: string;
}

@injectable()
export class CreateRemoteNoteUseCase extends UseCase<CreateRemoteNoteParams, RemoteNote> {
  constructor(@inject(TYPES.RemoteNoteRepository) private repository: RemoteNoteRepository) {
    super();
  }

  protected async run(params: CreateRemoteNoteParams): Promise<RemoteNote> {
    return this.repository.createNote(params.title, params.content);
  }
}
