export interface Route<T extends string = string> {
  readonly name: T;
  readonly title: string;
  readonly showBackArrow: boolean;
  readonly showTopBar: boolean;
  readonly showBottomNav: boolean;
  readonly analyticsName: string;
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
    analyticsName: 'home_screen',
  },
  UiComponents: {
    name: 'UiComponents',
    ...defaults,
    title: 'UI Components',
    analyticsName: 'ui_components_screen',
  },
  Networking: {
    name: 'Networking',
    ...defaults,
    title: 'Networking',
    analyticsName: 'networking_screen',
  },
  Storage: {
    name: 'Storage',
    ...defaults,
    title: 'Storage',
    analyticsName: 'storage_screen',
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
    analyticsName: 'settings_screen',
  },
  Login: {
    name: 'Login',
    ...defaults,
    title: 'Login',
    showBackArrow: false,
    showTopBar: false,
    showBottomNav: false,
    analyticsName: 'login_screen',
  },
  Register: {
    name: 'Register',
    ...defaults,
    title: 'Register',
    showTopBar: false,
    showBottomNav: false,
    analyticsName: 'register_screen',
  },
} as const satisfies Record<string, Route>;

export type RouteName = keyof typeof Routes;
export type HomeSectionName = keyof typeof HomeSection;

export const getRoute = (name: string): Route => {
  return Routes[name as RouteName] ?? { name, ...defaults, title: name, analyticsName: name };
};
