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

  // Platform APIs
  platform_apis_title: 'Platform APIs',
  platform_apis_subtitle: 'Native platform integrations and device features',
  platform_apis_share_title: 'Share',
  platform_apis_share_action: 'Share Text',
  platform_apis_dial_title: 'Phone Dialer',
  platform_apis_dial_action: 'Dial Number',
  platform_apis_link_title: 'Open Link',
  platform_apis_link_action: 'Open in Browser',
  platform_apis_email_title: 'Send Email',
  platform_apis_email_action: 'Compose Email',
  platform_apis_copy_title: 'Clipboard',
  platform_apis_copy_action: 'Copy to Clipboard',
  platform_apis_copied_message: 'Copied to clipboard',
  platform_apis_location_title: 'Location',
  platform_apis_location_action: 'Get Location',
  platform_apis_location_loading: 'Getting location...',
  platform_apis_location_error: 'Failed to get location',
  platform_apis_location_result: 'Lat: %s, Lon: %s',
  platform_apis_location_updates_title: 'Location Updates',
  platform_apis_location_updates_start: 'Start Tracking',
  platform_apis_location_updates_stop: 'Stop Tracking',
  platform_apis_location_updates_error: 'Location tracking failed',
  platform_apis_biometrics_title: 'Biometrics',
  platform_apis_biometrics_action: 'Authenticate',
  platform_apis_biometrics_success: 'Authentication successful',
  platform_apis_biometrics_failed: 'Authentication failed',
  platform_apis_biometrics_cancelled: 'Authentication cancelled',
  platform_apis_biometrics_not_available: 'Biometrics not available',
  platform_apis_flashlight_title: 'Flashlight',
  platform_apis_flashlight_on: 'Turn On',
  platform_apis_flashlight_off: 'Turn Off',
  platform_apis_flashlight_not_available: 'Flashlight not available',

  // Common
  common_loading: 'Loading...',
  common_error: 'Error',
  common_retry: 'Retry',
  common_cancel: 'Cancel',
  common_ok: 'OK',
  common_save: 'Save',
} as const;

export type StringKey = keyof typeof en;
