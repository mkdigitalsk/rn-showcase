import { MMKV } from 'react-native-mmkv';

export class Preferences {
  private storage: MMKV;

  constructor(storageName: string) {
    this.storage = new MMKV({ id: storageName });
  }

  getString(key: string): string | undefined {
    return this.storage.getString(key);
  }

  setString(key: string, value: string): void {
    this.storage.set(key, value);
  }

  getInt(key: string): number | undefined {
    const value = this.storage.getNumber(key);
    return value;
  }

  setInt(key: string, value: number): void {
    this.storage.set(key, value);
  }

  getBoolean(key: string): boolean | undefined {
    return this.storage.getBoolean(key);
  }

  setBoolean(key: string, value: boolean): void {
    this.storage.set(key, value);
  }

  remove(key: string): void {
    this.storage.delete(key);
  }

  clear(): void {
    this.storage.clearAll();
  }
}
