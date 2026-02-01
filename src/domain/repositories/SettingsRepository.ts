import { ThemeMode } from '../../presentation/foundation/themeMode';
import { Language } from '../../presentation/foundation/strings/StringsProvider';

export interface SettingsRepository {
  getThemeMode(): ThemeMode;
  setThemeMode(mode: ThemeMode): void;
  getLanguage(): Language | undefined;
  setLanguage(language: Language): void;
}
