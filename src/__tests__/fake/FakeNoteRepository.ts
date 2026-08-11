import { Note, NoteSortOption } from '../../domain/model/Note';
import { NoteListener, NoteRepository } from '../../domain/repositories/NoteRepository';

export class FakeNoteRepository implements NoteRepository {
  private notes: Note[] = [];
  private nextId = 1;

  storedNotes(): Note[] {
    return this.notes;
  }

  subscribe(_query: string, _sortOption: NoteSortOption, listener: NoteListener): () => void {
    listener(this.notes);
    return () => {};
  }

  async insert(note: Omit<Note, 'id'>): Promise<void> {
    this.notes = [...this.notes, { ...note, id: this.nextId++ }];
  }

  async update(note: Note): Promise<void> {
    this.notes = this.notes.map(stored => (stored.id === note.id ? note : stored));
  }

  async delete(id: number): Promise<void> {
    this.notes = this.notes.filter(stored => stored.id !== id);
  }

  async deleteAll(): Promise<void> {
    this.notes = [];
  }
}
