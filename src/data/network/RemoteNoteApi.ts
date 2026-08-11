import { injectable } from 'tsyringe';
import { AxiosError } from 'axios';
import { httpClient } from './httpClient';
import { handleApiCall } from './apiCallHandler';
import { RemoteNoteDTO } from '../dto/RemoteNoteDTO';
import { NoteConflictException } from '../../domain/exceptions/NoteConflictException';
import { RemoteNoteMapper } from '../mappers/RemoteNoteMapper';

const PRECONDITION_FAILED = 412;

export interface RemoteNoteApi {
  fetchNotes(): Promise<RemoteNoteDTO[]>;
  createNote(title: string, content: string): Promise<RemoteNoteDTO>;
  updateNote(id: number, title: string, content: string, etag: string): Promise<RemoteNoteDTO>;
  deleteNote(id: number): Promise<void>;
}

@injectable()
export class RemoteNoteApiImpl implements RemoteNoteApi {
  async fetchNotes(): Promise<RemoteNoteDTO[]> {
    return handleApiCall(async () => {
      const response = await httpClient.get('/notes');
      return response.data as RemoteNoteDTO[];
    });
  }

  async createNote(title: string, content: string): Promise<RemoteNoteDTO> {
    return handleApiCall(async () => {
      const response = await httpClient.post('/notes', { title, content });
      return response.data as RemoteNoteDTO;
    });
  }

  async updateNote(id: number, title: string, content: string, etag: string): Promise<RemoteNoteDTO> {
    return handleApiCall(async () => {
      try {
        const response = await httpClient.put(`/notes/${id}`, { title, content }, { headers: { 'If-Match': etag } });
        return response.data as RemoteNoteDTO;
      } catch (error) {
        // handleApiCall would flatten this into a generic ApiException and lose the row.
        if (error instanceof AxiosError && error.response?.status === PRECONDITION_FAILED) {
          throw new NoteConflictException(RemoteNoteMapper.map(error.response.data as RemoteNoteDTO));
        }
        throw error;
      }
    });
  }

  async deleteNote(id: number): Promise<void> {
    return handleApiCall(async () => {
      await httpClient.delete(`/notes/${id}`);
    });
  }
}
