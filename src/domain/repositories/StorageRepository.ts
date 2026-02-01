import { StorageData } from '../model/StorageData';

export interface StorageRepository {
  loadInitialData(): Promise<StorageData>;
  setSessionCounter(value: number): Promise<void>;
  setPersistentCounter(value: number): Promise<void>;
  clearSession(): Promise<void>;
  observe(listener: (data: StorageData) => void): () => void;
}
