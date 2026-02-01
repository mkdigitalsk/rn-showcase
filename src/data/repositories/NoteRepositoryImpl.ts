import { inject, injectable } from 'tsyringe';
import { NoteRepository, NoteListener } from '../../domain/repositories/NoteRepository';
import { DatabaseClient } from '../database/DatabaseClient';
import { Note, NoteSortOption } from '../../domain/model/Note';
import { TYPES } from '../../app/diTypes';

interface Subscription {
  query: string;
  sortOption: NoteSortOption;
  listener: NoteListener;
}

@injectable()
export class NoteRepositoryImpl implements NoteRepository {
  private subscriptions = new Set<Subscription>();

  constructor(
    @inject(TYPES.DatabaseClient) private client: DatabaseClient,
  ) {}

  subscribe(
    query: string,
    sortOption: NoteSortOption,
    listener: NoteListener,
  ): () => void {
    const subscription: Subscription = { query, sortOption, listener };
    this.subscriptions.add(subscription);

    // Emit current data immediately
    const notes = this.client.queryNotes(query, sortOption);
    listener(notes);

    return () => {
      this.subscriptions.delete(subscription);
    };
  }

  async insert(note: Omit<Note, 'id'>): Promise<void> {
    this.client.insert(note.title, note.content, note.createdAt);
    this.notifyAll();
  }

  async update(note: Note): Promise<void> {
    this.client.update(note.id, note.title, note.content);
    this.notifyAll();
  }

  async delete(id: number): Promise<void> {
    this.client.deleteById(id);
    this.notifyAll();
  }

  async deleteAll(): Promise<void> {
    this.client.deleteAll();
    this.notifyAll();
  }

  private notifyAll(): void {
    for (const sub of this.subscriptions) {
      const notes = this.client.queryNotes(sub.query, sub.sortOption);
      sub.listener(notes);
    }
  }
}
