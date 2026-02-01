export const en = {
  // Navigation
  nav_home: 'Home',
  nav_settings: 'Settings',

  // Screens
  screen_home: 'Home',
  screen_ui_components: 'UI Components',
  screen_networking: 'Networking',
  screen_storage: 'Storage',
  screen_settings: 'Settings',

  // Settings
  settings_language: 'Language',
  settings_theme: 'Theme',
  settings_dark_mode: 'Dark Mode',
  settings_about: 'About',
  settings_version: 'Version',
  settings_appearance: 'Appearance',
  settings_theme_light: 'Light',
  settings_theme_dark: 'Dark',
  settings_theme_system: 'System',

  // Languages
  language_en: 'English',
  language_sk: 'Slovak',

  // Storage
  storage_title: 'Local Storage',
  storage_subtitle: 'Demonstrates session vs persistent storage using MMKV',
  storage_session_label: 'Session Counter',
  storage_session_hint: 'Resets when app is killed or session is cleared',
  storage_persistent_label: 'Persistent Counter',
  storage_persistent_hint: 'Survives app restarts (stored in MMKV)',
  storage_clear_session: 'Clear Session',

  // Common
  common_loading: 'Loading...',
  common_error: 'Error',
  common_retry: 'Retry',
  common_cancel: 'Cancel',
  common_ok: 'OK',
  common_save: 'Save',
} as const;

export type StringKey = keyof typeof en;
