import { Note, NoteSortOption } from '../model/Note';

export type NoteListener = (notes: Note[]) => void;

export interface NoteRepository {
  subscribe(
    query: string,
    sortOption: NoteSortOption,
    listener: NoteListener,
  ): () => void;
  insert(note: Omit<Note, 'id'>): Promise<void>;
  update(note: Note): Promise<void>;
  delete(id: number): Promise<void>;
  deleteAll(): Promise<void>;
}
