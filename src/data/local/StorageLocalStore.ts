import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { StorageData } from '../../domain/model/StorageData';
import { SessionPreferences } from './SessionPreferences';
import { PersistentPreferences } from './PersistentPreferences';
import { TYPES } from '../../app/diTypes';

type Listener = (data: StorageData) => void;

export interface StorageLocalStore {
  load(): StorageData;
  setSessionCounter(value: number): void;
  setPersistentCounter(value: number): void;
  clearSession(): void;
  observe(listener: Listener): () => void;
}

@injectable()
export class StorageLocalStoreImpl implements StorageLocalStore {
  private data: StorageData = { sessionCounter: 0, persistentCounter: 0 };
  private listeners: Set<Listener> = new Set();

  constructor(
    @inject(TYPES.SessionPreferences) private sessionPreferences: SessionPreferences,
    @inject(TYPES.PersistentPreferences) private persistentPreferences: PersistentPreferences
  ) {}

  load(): StorageData {
    this.data = {
      sessionCounter: this.sessionPreferences.getSessionCounter(),
      persistentCounter: this.persistentPreferences.getPersistentCounter(),
    };
    this.notifyListeners();
    return this.data;
  }

  setSessionCounter(value: number): void {
    this.sessionPreferences.setSessionCounter(value);
    this.data = { ...this.data, sessionCounter: value };
    this.notifyListeners();
  }

  setPersistentCounter(value: number): void {
    this.persistentPreferences.setPersistentCounter(value);
    this.data = { ...this.data, persistentCounter: value };
    this.notifyListeners();
  }

  clearSession(): void {
    this.sessionPreferences.clear();
    this.data = { ...this.data, sessionCounter: 0 };
    this.notifyListeners();
  }

  observe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.data));
  }
}
