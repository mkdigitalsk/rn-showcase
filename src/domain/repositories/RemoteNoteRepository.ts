import { RemoteNote } from '../model/RemoteNote';

export interface RemoteNoteRepository {
  getNotes(): Promise<RemoteNote[]>;
  createNote(title: string, content: string): Promise<RemoteNote>;
  updateNote(id: number, title: string, content: string, etag: string): Promise<RemoteNote>;
  deleteNote(id: number): Promise<void>;
}
