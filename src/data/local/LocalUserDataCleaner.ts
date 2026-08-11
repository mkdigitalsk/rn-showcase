import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { NoteRepository } from '../../domain/repositories/NoteRepository';
import { SessionPreferences } from './SessionPreferences';
import { PersistentPreferences } from './PersistentPreferences';
import { TYPES } from '../../app/diTypes';

export interface LocalUserDataCleaner {
  clear(): Promise<void>;
}

@injectable()
export class LocalUserDataCleanerImpl implements LocalUserDataCleaner {
  constructor(
    @inject(TYPES.SessionPreferences) private session: SessionPreferences,
    @inject(TYPES.PersistentPreferences) private persistent: PersistentPreferences,
    @inject(TYPES.NoteRepository) private notes: NoteRepository
  ) {}

  // The counter goes by key: theme mode and language share this store and belong to the device, not the account.
  // A failing note wipe must not stop the token from going, or a broken local table keeps the person signed in.
  async clear(): Promise<void> {
    await this.notes.deleteAll().catch(() => undefined);
    this.persistent.clearPersistentCounter();
    this.session.clear();
  }
}
