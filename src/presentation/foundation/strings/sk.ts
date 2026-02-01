import { StringKey } from './en';

export const sk: Record<StringKey, string> = {
  // Navigation
  nav_home: 'Domov',
  nav_settings: 'Nastavenia',

  // Screens
  screen_home: 'Domov',
  screen_ui_components: 'UI Komponenty',
  screen_networking: 'Sieť',
  screen_storage: 'Úložisko',
  screen_settings: 'Nastavenia',

  // Settings
  settings_language: 'Jazyk',
  settings_theme: 'Téma',
  settings_dark_mode: 'Tmavý režim',
  settings_about: 'O aplikácii',
  settings_version: 'Verzia',
  settings_appearance: 'Vzhľad',
  settings_theme_light: 'Svetlý',
  settings_theme_dark: 'Tmavý',
  settings_theme_system: 'Systém',

  // Languages
  language_en: 'Angličtina',
  language_sk: 'Slovenčina',

  // Storage
  storage_title: 'Lokálne úložisko',
  storage_subtitle: 'Demonštrácia session vs perzistentného úložiska pomocou MMKV',
  storage_session_label: 'Session počítadlo',
  storage_session_hint: 'Resetuje sa pri zatvorení aplikácie alebo vyčistení session',
  storage_persistent_label: 'Perzistentné počítadlo',
  storage_persistent_hint: 'Prežije reštart aplikácie (uložené v MMKV)',
  storage_clear_session: 'Vyčistiť session',

  // Common
  common_loading: 'Načítavam...',
  common_error: 'Chyba',
  common_retry: 'Skúsiť znova',
  common_cancel: 'Zrušiť',
  common_ok: 'OK',
  common_save: 'Uložiť',
};
