import { PersistentPreferences } from '../../data/local/PersistentPreferences';

export class FakePersistentPreferences implements PersistentPreferences {
  private themeMode = 'system';
  private language: string | undefined = undefined;
  private counter = 0;

  getPersistentCounter(): number {
    return this.counter;
  }

  setPersistentCounter(value: number): void {
    this.counter = value;
  }

  clearPersistentCounter(): void {
    this.counter = 0;
  }

  getThemeMode(): string {
    return this.themeMode;
  }

  setThemeMode(mode: string): void {
    this.themeMode = mode;
  }

  getLanguage(): string | undefined {
    return this.language;
  }

  setLanguage(language: string): void {
    this.language = language;
  }
}
