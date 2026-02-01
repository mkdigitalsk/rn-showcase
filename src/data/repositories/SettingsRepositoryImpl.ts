import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { TYPES } from '../../app/diTypes';
import { SettingsRepository } from '../../domain/repositories/SettingsRepository';
import { PersistentPreferences } from '../local/PersistentPreferences';
import { ThemeMode } from '../../presentation/foundation/themeMode';
import { Language } from '../../presentation/foundation/strings/StringsProvider';

const VALID_THEMES: ThemeMode[] = ['light', 'dark', 'system'];
const VALID_LANGUAGES: Language[] = ['en', 'sk'];

@injectable()
export class SettingsRepositoryImpl implements SettingsRepository {
  constructor(
    @inject(TYPES.PersistentPreferences) private persistentPreferences: PersistentPreferences,
  ) {}

  getThemeMode(): ThemeMode {
    const stored = this.persistentPreferences.getThemeMode();
    return VALID_THEMES.includes(stored as ThemeMode)
      ? (stored as ThemeMode)
      : 'system';
  }

  setThemeMode(mode: ThemeMode): void {
    this.persistentPreferences.setThemeMode(mode);
  }

  getLanguage(): Language | undefined {
    const stored = this.persistentPreferences.getLanguage();
    if (stored && VALID_LANGUAGES.includes(stored as Language)) {
      return stored as Language;
    }
    return undefined;
  }

  setLanguage(language: Language): void {
    this.persistentPreferences.setLanguage(language);
  }
}
