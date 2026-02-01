import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { StorageData } from '../../domain/models/StorageData';
import { StorageRepository } from '../../domain/repositories/StorageRepository';
import { StorageLocalStore } from '../local/StorageLocalStore';
import { TYPES } from '../../app/diTypes';

@injectable()
export class StorageRepositoryImpl implements StorageRepository {
  constructor(
    @inject(TYPES.StorageLocalStore) private localStore: StorageLocalStore
  ) {}

  async loadInitialData(): Promise<StorageData> {
    return this.localStore.load();
  }

  async setSessionCounter(value: number): Promise<void> {
    this.localStore.setSessionCounter(value);
  }

  async setPersistentCounter(value: number): Promise<void> {
    this.localStore.setPersistentCounter(value);
  }

  async clearSession(): Promise<void> {
    this.localStore.clearSession();
  }

  observe(listener: (data: StorageData) => void): () => void {
    return this.localStore.observe(listener);
  }
}
