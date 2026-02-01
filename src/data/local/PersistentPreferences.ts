import 'reflect-metadata';
import { injectable } from 'tsyringe';
import { Preferences } from './Preferences';

const PERSISTENT_COUNTER_KEY = 'persistent_counter';
const THEME_MODE_KEY = 'theme_mode';

export interface PersistentPreferences {
  getPersistentCounter(): number;
  setPersistentCounter(value: number): void;
  getThemeMode(): string;
  setThemeMode(mode: string): void;
}

@injectable()
export class PersistentPreferencesImpl implements PersistentPreferences {
  private preferences: Preferences;

  constructor() {
    this.preferences = new Preferences('persistent_storage');
  }

  getPersistentCounter(): number {
    return this.preferences.getInt(PERSISTENT_COUNTER_KEY) ?? 0;
  }

  setPersistentCounter(value: number): void {
    this.preferences.setInt(PERSISTENT_COUNTER_KEY, value);
  }

  getThemeMode(): string {
    return this.preferences.getString(THEME_MODE_KEY) ?? 'system';
  }

  setThemeMode(mode: string): void {
    this.preferences.setString(THEME_MODE_KEY, mode);
  }
}
