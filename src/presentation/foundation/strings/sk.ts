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

  // Platform APIs
  platform_apis_title: 'Platformové API',
  platform_apis_subtitle: 'Natívne integrácie a funkcie zariadenia',
  platform_apis_share_title: 'Zdieľanie',
  platform_apis_share_action: 'Zdieľať text',
  platform_apis_dial_title: 'Telefón',
  platform_apis_dial_action: 'Vytočiť číslo',
  platform_apis_link_title: 'Otvoriť odkaz',
  platform_apis_link_action: 'Otvoriť v prehliadači',
  platform_apis_email_title: 'Odoslať email',
  platform_apis_email_action: 'Napísať email',
  platform_apis_copy_title: 'Schránka',
  platform_apis_copy_action: 'Kopírovať do schránky',
  platform_apis_copied_message: 'Skopírované do schránky',
  platform_apis_location_title: 'Poloha',
  platform_apis_location_action: 'Získať polohu',
  platform_apis_location_loading: 'Získavam polohu...',
  platform_apis_location_error: 'Nepodarilo sa získať polohu',
  platform_apis_location_result: 'Lat: %s, Lon: %s',
  platform_apis_location_updates_title: 'Sledovanie polohy',
  platform_apis_location_updates_start: 'Spustiť sledovanie',
  platform_apis_location_updates_stop: 'Zastaviť sledovanie',
  platform_apis_location_updates_error: 'Sledovanie polohy zlyhalo',
  platform_apis_biometrics_title: 'Biometria',
  platform_apis_biometrics_action: 'Autentifikovať',
  platform_apis_biometrics_success: 'Autentifikácia úspešná',
  platform_apis_biometrics_failed: 'Autentifikácia zlyhala',
  platform_apis_biometrics_cancelled: 'Autentifikácia zrušená',
  platform_apis_biometrics_not_available: 'Biometria nie je dostupná',
  platform_apis_flashlight_title: 'Baterka',
  platform_apis_flashlight_on: 'Zapnúť',
  platform_apis_flashlight_off: 'Vypnúť',
  platform_apis_flashlight_not_available: 'Baterka nie je dostupná',

  // Common
  common_loading: 'Načítavam...',
  common_error: 'Chyba',
  common_retry: 'Skúsiť znova',
  common_cancel: 'Zrušiť',
  common_ok: 'OK',
  common_save: 'Uložiť',
};
