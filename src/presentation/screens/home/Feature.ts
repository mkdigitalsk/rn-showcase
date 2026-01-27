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
  title: string;
  subtitle: string;
  icon: string;
}

export const showcaseFeatures: Feature[] = [
  {
    id: FeatureId.UI_COMPONENTS,
    title: 'UI Components',
    subtitle: 'Material Design 3 components',
    icon: 'palette',
  },
  {
    id: FeatureId.NETWORKING,
    title: 'Networking',
    subtitle: 'REST API integration with Axios',
    icon: 'cloud',
  },
  {
    id: FeatureId.STORAGE,
    title: 'Storage',
    subtitle: 'Local storage with MMKV',
    icon: 'storage',
  },
  {
    id: FeatureId.DATABASE,
    title: 'Database',
    subtitle: 'SQLite database integration',
    icon: 'dataset',
  },
  {
    id: FeatureId.PLATFORM_APIS,
    title: 'Platform APIs',
    subtitle: 'Native platform integrations',
    icon: 'phone-android',
  },
  {
    id: FeatureId.SCANNER,
    title: 'Scanner',
    subtitle: 'QR code and barcode scanning',
    icon: 'qr-code-2',
  },
  {
    id: FeatureId.CALENDAR,
    title: 'Calendar',
    subtitle: 'Calendar events integration',
    icon: 'calendar-month',
  },
  {
    id: FeatureId.NOTIFICATIONS,
    title: 'Notifications',
    subtitle: 'Push and local notifications',
    icon: 'notifications',
  },
];
