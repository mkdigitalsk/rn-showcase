import 'reflect-metadata';
import { injectable } from 'tsyringe';
import { Preferences } from './Preferences';

const SESSION_COUNTER_KEY = 'session_counter';
const AUTH_TOKEN_KEY = 'auth_token';

export const SESSION_STORAGE_ID = 'session_storage';

export interface SessionPreferences {
  getSessionCounter(): number;
  setSessionCounter(value: number): void;
  getAuthToken(): string | undefined;
  setAuthToken(token: string): void;
  clearAuthToken(): void;
  clear(): void;
}

@injectable()
export class SessionPreferencesImpl implements SessionPreferences {
  private preferences: Preferences;

  constructor() {
    this.preferences = new Preferences(SESSION_STORAGE_ID);
  }

  getSessionCounter(): number {
    return this.preferences.getInt(SESSION_COUNTER_KEY) ?? 0;
  }

  setSessionCounter(value: number): void {
    this.preferences.setInt(SESSION_COUNTER_KEY, value);
  }

  getAuthToken(): string | undefined {
    return this.preferences.getString(AUTH_TOKEN_KEY);
  }

  setAuthToken(token: string): void {
    this.preferences.setString(AUTH_TOKEN_KEY, token);
  }

  clearAuthToken(): void {
    this.preferences.remove(AUTH_TOKEN_KEY);
  }

  clear(): void {
    this.preferences.clear();
  }
}
