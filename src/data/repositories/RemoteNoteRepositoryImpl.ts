import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { RemoteNote } from '../../domain/model/RemoteNote';
import { RemoteNoteApi } from '../network/RemoteNoteApi';
import { RemoteNoteRepository } from '../../domain/repositories/RemoteNoteRepository';
import { TYPES } from '../../app/diTypes';
import { mapAll } from '../base/Mapper';
import { RemoteNoteMapper } from '../mappers/RemoteNoteMapper';

@injectable()
export class RemoteNoteRepositoryImpl implements RemoteNoteRepository {
  constructor(@inject(TYPES.RemoteNoteApi) private api: RemoteNoteApi) {}

  async getNotes(): Promise<RemoteNote[]> {
    return mapAll(RemoteNoteMapper, await this.api.fetchNotes());
  }

  async createNote(title: string, content: string): Promise<RemoteNote> {
    return RemoteNoteMapper.map(await this.api.createNote(title, content));
  }

  async updateNote(id: number, title: string, content: string, etag: string): Promise<RemoteNote> {
    return RemoteNoteMapper.map(await this.api.updateNote(id, title, content, etag));
  }

  async deleteNote(id: number): Promise<void> {
    return this.api.deleteNote(id);
  }
}
