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

  // Common
  common_loading: 'Loading...',
  common_error: 'Error',
  common_retry: 'Retry',
  common_cancel: 'Cancel',
  common_ok: 'OK',
  common_save: 'Save',
} as const;

export type StringKey = keyof typeof en;
