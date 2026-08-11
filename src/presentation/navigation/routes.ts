export interface Route<T extends string = string> {
  readonly name: T;
  readonly title: string;
  readonly showBackArrow: boolean;
  readonly showTopBar: boolean;
  readonly showBottomNav: boolean;
}

const defaults = {
  showBackArrow: true,
  showTopBar: true,
  showBottomNav: true,
} as const;

// HomeSection routes
export const HomeSection = {
  HomeMain: {
    name: 'HomeMain',
    ...defaults,
    title: 'Home',
    showBackArrow: false,
  },
  UiComponents: {
    name: 'UiComponents',
    ...defaults,
    title: 'UI Components',
  },
  Networking: {
    name: 'Networking',
    ...defaults,
    title: 'Networking',
  },
  Storage: {
    name: 'Storage',
    ...defaults,
    title: 'Storage',
  },
  PlatformApis: {
    name: 'PlatformApis',
    ...defaults,
    title: 'Platform APIs',
  },
  Database: {
    name: 'Database',
    ...defaults,
    title: 'Database',
  },
  Scanner: {
    name: 'Scanner',
    ...defaults,
    title: 'Scanner',
  },
  Calendar: {
    name: 'Calendar',
    ...defaults,
    title: 'Calendar',
  },
  Notifications: {
    name: 'Notifications',
    ...defaults,
    title: 'Notifications',
  },
} as const satisfies Record<string, Route>;

// Top-level routes
export const Routes = {
  ...HomeSection,
  Settings: {
    name: 'Settings',
    ...defaults,
    title: 'Settings',
    showBackArrow: false,
  },
  SignIn: {
    name: 'SignIn',
    ...defaults,
    title: 'SignIn',
    showBackArrow: false,
    showTopBar: false,
    showBottomNav: false,
  },
  SignUp: {
    name: 'SignUp',
    ...defaults,
    title: 'SignUp',
    showTopBar: false,
    showBottomNav: false,
  },
} as const satisfies Record<string, Route>;

export type RouteName = keyof typeof Routes;
export type HomeSectionName = keyof typeof HomeSection;

export const getRoute = (name: string): Route => {
  return Routes[name as RouteName] ?? { name, ...defaults, title: name };
};
