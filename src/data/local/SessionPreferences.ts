import 'reflect-metadata';
import { injectable } from 'tsyringe';
import { Preferences } from './Preferences';

const SESSION_COUNTER_KEY = 'session_counter';

export interface SessionPreferences {
  getSessionCounter(): number;
  setSessionCounter(value: number): void;
  clear(): void;
}

@injectable()
export class SessionPreferencesImpl implements SessionPreferences {
  private preferences: Preferences;

  constructor() {
    this.preferences = new Preferences('session_storage');
  }

  getSessionCounter(): number {
    return this.preferences.getInt(SESSION_COUNTER_KEY) ?? 0;
  }

  setSessionCounter(value: number): void {
    this.preferences.setInt(SESSION_COUNTER_KEY, value);
  }

  clear(): void {
    this.preferences.clear();
  }
}
