import { StringKey } from '../../foundation/strings/en';

export enum FeatureId {
  UI_COMPONENTS = 'UI_COMPONENTS',
  NETWORKING = 'NETWORKING',
  STORAGE = 'STORAGE',
  DATABASE = 'DATABASE',
  PLATFORM_APIS = 'PLATFORM_APIS',
  SCANNER = 'SCANNER',
  CALENDAR = 'CALENDAR',
  NOTIFICATIONS = 'NOTIFICATIONS',
}

export interface Feature {
  id: FeatureId;
  titleKey: StringKey;
  subtitleKey: StringKey;
  icon: string;
}

// Icon names from MaterialCommunityIcons
export const showcaseFeatures: Feature[] = [
  {
    id: FeatureId.UI_COMPONENTS,
    titleKey: 'screen_ui_components',
    subtitleKey: 'feature_ui_components_subtitle',
    icon: 'palette-outline',
  },
  {
    id: FeatureId.NETWORKING,
    titleKey: 'screen_networking',
    subtitleKey: 'feature_networking_subtitle',
    icon: 'cloud-outline',
  },
  {
    id: FeatureId.STORAGE,
    titleKey: 'screen_storage',
    subtitleKey: 'feature_storage_subtitle',
    icon: 'content-save-outline',
  },
  {
    id: FeatureId.DATABASE,
    titleKey: 'screen_database',
    subtitleKey: 'feature_database_subtitle',
    icon: 'database-outline',
  },
  {
    id: FeatureId.PLATFORM_APIS,
    titleKey: 'screen_platform_apis',
    subtitleKey: 'feature_platform_apis_subtitle',
    icon: 'cellphone',
  },
  {
    id: FeatureId.SCANNER,
    titleKey: 'screen_scanner',
    subtitleKey: 'feature_scanner_subtitle',
    icon: 'qrcode-scan',
  },
  {
    id: FeatureId.CALENDAR,
    titleKey: 'screen_calendar',
    subtitleKey: 'feature_calendar_subtitle',
    icon: 'calendar-outline',
  },
  {
    id: FeatureId.NOTIFICATIONS,
    titleKey: 'screen_notifications',
    subtitleKey: 'feature_notifications_subtitle',
    icon: 'bell-outline',
  },
];
